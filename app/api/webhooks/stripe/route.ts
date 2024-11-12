import Stripe from "stripe";
import { NextRequest } from "next/server";
import { headers } from "next/headers";
import stripe from "@/lib/stripe";
import prisma from "@/lib/prisma";
import { EStatusType } from "@/types";

type METADATA = {
  userId: string;
  reservationId: string;
};

export async function POST(request: NextRequest) {
  const body = await request.text();
  const endpointSecret = process.env.STRIPE_SECRET_WEBHOOK_KEY!;
  const sig = headers().get("stripe-signature") as string;
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return new Response(`Webhook Error: ${err}`, {
      status: 400,
    });
  }

  const eventType = event.type;
  try {
    // database update here
    const object = event.data.object as Stripe.Checkout.Session;
    const { reservationId } = object.metadata as METADATA;
    if (eventType === "checkout.session.completed") {
      // do something
      console.log("Event ", event);
      if (!reservationId) {
        return new Response("Order ID not found", {
          status: 400,
        });
      }

      await prisma.reservation.update({
        where: {
          id: reservationId,
        },
        data: {
          status: EStatusType.PAID,
        },
      });
      console.log("Reservation ID ", reservationId);
    } else {
      await prisma.reservation.update({
        where: {
          id: reservationId,
        },
        data: {
          status: EStatusType.CANCELLED,
        },
      });
    }

    return new Response("Payment success", {
      status: 200,
    });
  } catch (error) {
    console.log("Error ", error);
    return new Response("Server error", {
      status: 500,
    });
  }
}
