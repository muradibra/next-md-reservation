"use server";

import prisma from "@/lib/prisma";
import { Reservation } from "@prisma/client";

type ReservationValues = {
  doctor: string;
  timeSlotId: string;
  userId: string;
  message?: string;
  status: "pending" | "confirmed" | "cancelled";
};

type Props = {
  values: ReservationValues[];
};

export async function createReservation({ values }: Props) {
  try {
    const userExists = await prisma.user.findUnique({
      where: { externalId: values[0].userId },
    });
    // console.log("----userExists----", userExists);

    const { doctor, timeSlotId, message, status } = values[0];
    const res = await prisma.reservation.create({
      data: {
        userId: userExists?.id!,
        slotId: timeSlotId!,
        doctorId: doctor,
        status,
        message,
      },
    });
    console.log("----res----", res);

    return {
      ok: true,
      status: 200,
      message: "Reservation created",
    };
  } catch (err) {
    return {
      ok: false,
      status: 500,
      message: "Error while creating reservation",
    };
  }
}
