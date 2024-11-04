import { getCurrentUserFromClerk, getCurrentUserFromDb } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";
import { UserTable } from "./_components/UserTable";
import prisma from "@/lib/prisma";
import { ReservationsTable } from "./_components/ReservationsTable";
import { revalidatePath } from "next/cache";

const DashboardPage = async () => {
  const { userId } = await getCurrentUserFromClerk();
  if (!userId) {
    redirect("/");
  }
  const user = await getCurrentUserFromDb(userId!);
  if (user === "noUser" || user!.role !== "ADMIN") {
    redirect("/");
  }

  const users = await prisma.user.findMany({
    include: {
      reservations: true,
      reviews: true,
    },
  });
  const reservations = await prisma.reservation.findMany({
    include: {
      user: true,
      doctor: true,
      timeSlot: true,
    },
  });

  const updateStatus = async (reservationId: string, status: string) => {
    await prisma.reservation.update({
      where: {
        id: reservationId,
      },
      data: {
        status,
      },
    });

    revalidatePath("/");
    return {
      ok: true,
      status: 200,
    };
  };

  return (
    <div>
      <div className="py-[30px] sm:py-[50px] md:py-[70px] lg:py-[90px]">
        <div className="w-container">
          <h1 className="text-2xl mb-3">Users</h1>
          <UserTable users={users} />
        </div>
      </div>

      <div className="py-[30px] sm:py-[50px] md:py-[70px] lg:py-[90px]">
        <div className="w-container">
          <h1 className="text-2xl mb-3">Reservations</h1>
          <ReservationsTable
            reservations={reservations}
            updateStatus={updateStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
