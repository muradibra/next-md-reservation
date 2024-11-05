"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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
