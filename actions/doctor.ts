"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface DoctorValues {
  values: {
    firstName: string;
    lastName: string;
    specialty: string;
    imgUrl: string;
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

export async function updateDoctor({
  doctorId,
  values,
}: {
  doctorId: string;
  values: DoctorValues["values"];
}) {
  try {
    const doctor = await prisma.doctor.update({
      where: {
        id: doctorId,
      },
      data: {
        ...values,
      },
    });

    revalidatePath("/dashboard");

    return {
      ok: true,
      message: "Doctor updated successfully",
      doctor,
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error.message,
    };
  }
}

export async function deleteDoctor(doctorId: string) {
  try {
    await prisma.doctor.delete({
      where: {
        id: doctorId,
      },
    });

    revalidatePath("/dashboard");

    return {
      ok: true,
      message: "Doctor deleted successfully",
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error.message,
    };
  }
}
