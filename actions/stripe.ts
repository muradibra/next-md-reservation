"use server";

import stripe from "@/lib/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function createCheckoutSession(reservationId: string) {
  try {
    // const priceId = data.priceId;

    const origin = headers().get("origin");

    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
          {
            // price: priceId,
            quantity: 1,
            price_data: {
              currency: "usd",
              unit_amount: 5 * 100,
              product_data: {
                name: "Reservation",
                description: "Reservation",
              },
            },
          },
        ],
        success_url: `${origin}`,
        cancel_url: `${origin}`,
        metadata: {
          reservationId,
          // userId: loggedUser.id,
          // priceId,
        },
      });
    return {
      ok: true,
      url: checkoutSession.url,
      // sessionId: checkoutSession.id,
    };
  } catch (error) {
    console.error(error);
    return { ok: false, error };
  }
}
