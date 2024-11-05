"use server";

import prisma from "@/lib/prisma";
import { Reservation } from "@prisma/client";
import { revalidatePath } from "next/cache";

type ReservationValues = {
  doctor: string;
  timeSlotId: string;
  userId: string;
  message?: string;
  status: "pending" | "confirmed" | "cancelled";
};

export async function createReservation(obj: ReservationValues[]) {
  try {
    const userExists = await prisma.user.findUnique({
      where: { externalId: obj.userId },
    });

    // console.log(obj);

    // console.log("----userExists----", userExists);

    const { doctor, timeSlotId, message, status } = obj;
    const res = await prisma.reservation.create({
      data: {
        userId: userExists?.id!,
        slotId: timeSlotId!,
        doctorId: doctor,
        status,
        message,
      },
    });

    await prisma.timeSlot.update({
      where: {
        id: timeSlotId,
      },
      data: {
        available: false,
      },
    });

    console.log("----res----", res);

    revalidatePath("/");

    return {
      ok: true,
      status: 200,
      message: "Reservation created",
    };
  } catch (err) {
    console.log("------reservation error------", err);

    return {
      ok: false,
      status: 500,
      message: "Error while creating reservation",
    };
  }
}

export async function updateStatus(reservationId: string, status: string) {
  try {
    await prisma.reservation.update({
      where: {
        id: reservationId,
      },
      data: {
        status,
      },
    });

    revalidatePath("/");
    return {
      ok: true,
      status: 200,
    };
  } catch (err) {
    return {
      ok: false,
      error: 500,
    };
  }
}

// export async function getUniqueReservation(slotId: string) {
//   try {
//     const reservation = await prisma.reservation.findFirst({
//       where: {
//         slotId,
//       },
//       include: {
//         timeSlot: true,
//         user: true,
//         doctor: true,
//       },
//     });

//     return {
//       ok: true,
//       status: 200,
//       reservation,
//     };
//   } catch (err) {
//     return {
//       ok: false,
//       status: 500,
//     };
//   }
// }
