"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface DoctorValues {
  values: {
    firstName: string;
    lastName: string;
    specialty: string;
  };
}

export async function getDoctors() {
  const doctors = await prisma.doctor.findMany({
    include: {
      timeSlots: true,
    },
  });

  return doctors;
}

export async function createDoctor({ values }: DoctorValues) {
  try {
    const doctor = await prisma.doctor.create({
      data: {
        ...values,
      },
    });

    revalidatePath("/dashboard");

    return {
      ok: true,
      message: "Doctor created successfully",
      doctor,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Doctor creation failed",
    };
  }
}
