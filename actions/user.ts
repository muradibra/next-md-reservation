"use server";

import prisma from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

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

export async function deleteUserFromDbAndClerk(userId: string) {
  try {
    const client = await clerkClient();
    await client.users.deleteUser(userId);
    revalidatePath("/dashboard");
  } catch (err) {
    return "error";
  }
}
