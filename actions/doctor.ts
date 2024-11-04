"use server";

import prisma from "@/lib/prisma";

export async function getDoctors() {
  const doctors = await prisma.doctor.findMany({
    include: {
      timeSlots: true,
    },
  });

  return doctors;
}
