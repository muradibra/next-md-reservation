"use server";

import prisma from "@/lib/prisma";
import { Reservation } from "@prisma/client";

type ReservationValues = {
  doctor: string;
  timeSlotId: string;
  userId: string;
  hour: number;
  message: string;
  status: "pending" | "confirmed" | "cancelled";
};

type Props = {
  values: ReservationValues[];
};

export async function createReservation(values: Props) {
  const userExists = await prisma.user.findUnique({
    where: { externalId: values.userId },
  });
  // console.log("----userExists----", userExists);

  const { doctor, timeSlotId, hour, message, status } = values;
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
}
