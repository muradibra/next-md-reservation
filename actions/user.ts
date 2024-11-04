"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// type Props = {
//   userId: string;
// };

export async function getCurrentUserFromClerk() {
  const user = auth();
  return user;
}

export async function getCurrentUserFromDb(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        externalId: userId,
      },
    });
    return user;
  } catch (err) {
    return "noUser";
  }
}
