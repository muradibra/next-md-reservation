"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type PostReviewProps = {
  obj: {
    doctor: string;
    rating: number;
    title: string;
    comment: string;
    userId: string;
  };
};

export async function postReview({ obj }: PostReviewProps) {
  try {
    const { doctor, rating, title, comment, userId } = obj;
    await prisma.review.create({
      data: {
        userId,
        doctorId: doctor,
        rating,
        title,
        comment,
      },
    });

    revalidatePath("/review");

    return {
      ok: true,
      message: "Review posted successfully",
    };
  } catch (error: any) {
    console.error(error);
    return {
      ok: false,
      message: error.message,
    };
  }
}
