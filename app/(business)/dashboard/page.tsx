import React from "react";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getCurrentUserFromClerk, getCurrentUserFromDb } from "@/actions/user";
import { UserTable } from "./_components/UserTable";
import { ReservationsTable } from "./_components/ReservationsTable";
import { TimeSlotTable } from "./_components/TimeSlotTable";
import { TimeSlotDialog } from "./_components/TimeSlotDialog";
import { DoctorsTable } from "./_components/DoctorsTable";
import { DoctorDialog } from "./_components/DoctorDialog";
import { ReviewsTable } from "./_components/ReviewsTable";

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
  const timeSlots = await prisma.timeSlot.findMany({
    include: {
      doctor: true,
    },
  });
  const doctors = await prisma.doctor.findMany({
    include: {
      reviews: true,
      reservations: true,
    },
  });
  const reviews = await prisma.review.findMany({
    include: {
      user: true,
      doctor: true,
    },
  });

  return (
    <div>
      <div className="py-[30px] sm:py-[50px] md:py-[70px] lg:py-[90px]">
        <div className="w-container">
          <h1 className="text-3xl mb-3 font-bold">Users</h1>
          <UserTable users={users} />
        </div>
      </div>

      <div className="py-[30px] sm:py-[50px] md:py-[70px] lg:py-[90px]">
        <div className="w-container">
          <h1 className="text-3xl mb-3 font-bold">Reservations</h1>
          <ReservationsTable reservations={reservations} />
        </div>
      </div>

      <div className="py-[30px] sm:py-[50px] md:py-[70px] lg:py-[90px]">
        <div className="w-container">
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-3xl mb-3 font-bold">Doctors</h1>
            <DoctorDialog type="CREATE" />
          </div>
          <DoctorsTable doctors={doctors} />
        </div>
      </div>

      <div className="py-[30px] sm:py-[50px] md:py-[70px] lg:py-[90px]">
        <div className="w-container">
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-3xl mb-3 font-bold">Reviews</h1>
            {/* <TimeSlotDialog type="CREATE" doctors={doctors} /> */}
          </div>
          <ReviewsTable reviews={reviews} />
        </div>
      </div>

      <div className="py-[30px] sm:py-[50px] md:py-[70px] lg:py-[90px]">
        <div className="w-container">
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-3xl mb-3 font-bold">Time Slots</h1>
            <TimeSlotDialog type="CREATE" doctors={doctors} />
          </div>
          <TimeSlotTable timeSlots={timeSlots} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
