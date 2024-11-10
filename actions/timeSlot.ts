"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type CreateTimeSlotProps = {
  values: {
    hour: string;
    doctor: string;
    date: string;
    availability: boolean;
  };
};

export async function deleteTimeSlot(slotId: string) {
  try {
    await prisma.timeSlot.delete({
      where: {
        id: slotId,
      },
    });

    revalidatePath("/");

    return {
      ok: true,
      status: 204,
    };
  } catch (err) {
    return {
      ok: false,
      status: 500,
    };
  }
}

export async function createTimeSlot({ values }: CreateTimeSlotProps) {
  try {
    const { availability, date, doctor, hour } = values;

    // Store the date as a local date string
    const formattedDate = new Date(date).toISOString();

    await prisma.timeSlot.create({
      data: {
        date: formattedDate,
        hour,
        available: availability,
        doctorId: doctor,
      },
    });
    revalidatePath("/");
    return {
      ok: true,
      status: 200,
      message: "Timeslot created successfully",
    };
  } catch (err: any) {
    return {
      ok: false,
      status: 500,
      message: err.message,
    };
  }
}

export async function getExistingTimeSlots(doctorId: string) {
  try {
    const timeSlots = await prisma.timeSlot.findMany({
      where: {
        doctorId,
      },
    });

    return {
      ok: true,
      status: 200,
      data: timeSlots,
    };
  } catch (err: any) {
    return {
      ok: false,
      status: 500,
      message: err.message,
    };
  }
}
