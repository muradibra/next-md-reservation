import { auth } from "@clerk/nextjs/server";

export function getCurrentUser() {
  const user = auth();
  return user;
}
