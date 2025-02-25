import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
// import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  console.log("Webhook received");

  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id } = evt.data;
  const eventType = evt.type;

  if (!id || !eventType || !payload || !payload.data) {
    return new Response("Error occured -- no id or eventType or payload data", {
      status: 400,
    });
  }
  // console.log("--------payload-------", payload);

  const { first_name, last_name, email_addresses } = payload.data;

  // console.log("--------name-------", name);
  // console.log("--------email-------", email);

  try {
    switch (eventType) {
      case "user.created":
        console.log("Creating user");

        await prisma.user.create({
          data: {
            externalId: id,
            email: email_addresses[0].email_address,
            name: `${first_name} ${last_name}`,
          },
        });
        break;
      case "user.deleted":
        console.log("Deleting user");

        const reservations = await prisma.reservation.findMany({
          where: { userId: id },
        });

        await prisma.reservation.deleteMany({
          where: {
            userId: id,
          },
        });

        for (const reservation of reservations) {
          await prisma.timeSlot.update({
            where: { id: reservation.slotId },
            data: { available: true },
          });
        }

        await prisma.review.deleteMany({
          where: {
            userId: id,
          },
        });

        await prisma.user.delete({
          where: {
            externalId: id,
          },
        });

        // await prisma.timeSlot.updateMany({
        //   where: {
        //     userId: id,
        //   },
        //   data: {
        //     available: true,
        //   },
        // });

        revalidatePath("/dashboard");

        break;
      case "user.updated":
        await prisma.user.update({
          where: {
            externalId: id,
          },
          data: {
            name: `${first_name} ${last_name}`,
            email: email_addresses[0].email_address,
          },
        });
        break;
    }
  } catch (err) {
    console.error("Error occured", err);
    return new Response(`Error occured`, {
      status: 400,
    });
  }

  // console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  // console.log("Webhook body:", body);

  return new Response("", { status: 200 });
}
