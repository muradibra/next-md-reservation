"use server";

import { auth } from "@clerk/nextjs/server";

export async function getCurrentUser() {
  const user = auth();
  return user;
}
