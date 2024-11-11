import Stripe from "stripe";
import { NextRequest } from "next/server";
import { headers } from "next/headers";
import stripe from "@/lib/stripe";
import prisma from "@/lib/prisma";
import { EStatusType } from "@/types";
type METADATA = {
  userId: string;
  priceId: string;
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
  // if (
  //   eventType !== "checkout.session.completed" &&
  //   eventType !== "checkout.session.async_payment_succeeded"
  // )
  //   return new Response("Server Error", {
  //     status: 500,
  //   });
  // const data = event.data.object;
  // const metadata = data.metadata as METADATA;
  // const userId = metadata.userId;
  // const priceId = metadata.priceId;
  // const created = data.created;
  // const currency = data.currency;
  // const customerDetails = data.customer_details;
  // const amount = data.amount_total;
  // const transactionDetails = {
  //   userId,
  //   priceId,
  //   created,
  //   currency,
  //   customerDetails,
  //   amount,
  // };
  try {
    // database update here
    if (eventType === "checkout.session.completed") {
      // do something
      console.log("Event ", event);
      const { reservationId } = event.data.object.metadata as METADATA;
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
    }

    return new Response("Subscription added", {
      status: 200,
    });
  } catch (error) {
    console.log("Error ", error);
    return new Response("Server error", {
      status: 500,
    });
  }
}
