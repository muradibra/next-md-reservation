"use server";

import prisma from "@/lib/prisma";
import { EStatusType } from "@/types";
import { revalidatePath } from "next/cache";

type ReservationValues = {
  doctor: string;
  timeSlotId: string | null;
  userId: string;
  message?: string;
  status: EStatusType;
};

export async function createReservation(obj: ReservationValues) {
  try {
    // const userExists = await prisma.user.findUnique({
    //   where: { externalId: obj.userId },
    // });

    const { doctor, timeSlotId, message, status, userId } = obj;
    console.log("------userId------", userId);

    const userExists = await prisma.user.findUnique({
      where: { externalId: userId },
    });

    if (!userExists) {
      throw new Error("Invalid user ID");
    }

    await prisma.reservation.create({
      data: {
        userId,
        slotId: timeSlotId!,
        doctorId: doctor,
        status,
        message,
      },
    });

    await prisma.timeSlot.update({
      where: {
        id: timeSlotId!,
      },
      data: {
        available: false,
      },
    });

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

export async function deleteReservation(reservationId: string) {
  try {
    // Find the reservation to get the timeSlotId
    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId },
    });

    if (!reservation) {
      throw new Error("Reservation not found");
    }

    const timeSlotId = reservation.slotId;

    // Delete the reservation
    await prisma.reservation.delete({
      where: { id: reservationId },
    });

    // Update the timeSlot to set availability to true
    await prisma.timeSlot.update({
      where: { id: timeSlotId },
      data: { available: true },
    });

    return {
      ok: true,
      status: 200,
      message: "Reservation deleted and timeslot updated successfully",
    };
  } catch (err: any) {
    console.log("------deleteReservation error------", err);
    return {
      ok: false,
      status: 500,
      message: err.message,
    };
  }
}
