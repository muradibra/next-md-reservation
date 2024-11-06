// // app/api/admin/deleteUser/route.ts

// import { NextResponse } from "next/server";
// import { Clerk, users } from "@clerk/clerk-sdk-node";
// import prisma from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";
// // import { auth } from "@clerk/nextjs";

// const clerkClient = new Clerk({ apiKey: process.env.CLERK_API_KEY });

// export async function DELETE(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const userIdToDelete = searchParams.get("userId");

//   if (!userIdToDelete) {
//     return NextResponse.json(
//       { message: "User ID is required" },
//       { status: 400 }
//     );
//   }

//   // Authenticate the request
//   const { userId } = await auth();
//   if (!userId) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   // Check if the requester is an admin
//   const adminUser = await prisma.user.findUnique({
//     where: { externalId: userId },
//   });

//   if (!adminUser || adminUser.role !== "ADMIN") {
//     return NextResponse.json({ message: "Forbidden" }, { status: 403 });
//   }

//   try {
//     // 1. Delete the user from Clerk
//     await clerkClient.users.deleteUser(userIdToDelete);

//     // 2. Delete the user from your Prisma database
//     await prisma.user.delete({
//       where: { externalId: userIdToDelete },
//     });

//     return NextResponse.json({ message: "User deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     return NextResponse.json(
//       { message: "Failed to delete user" },
//       { status: 500 }
//     );
//   }
// }
