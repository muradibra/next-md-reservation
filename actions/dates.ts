"use server";

import prisma from "@/lib/prisma";

export const getAvailableDates = async (doctorId: string) => {
  const timeslots = await prisma.timeSlot.findMany({
    where: {
      doctorId: doctorId,
      available: true,
    },
    select: {
      id: true,
      date: true,
      hour: true,
    },
  });

  const availableDates = timeslots.reduce((acc: any, timeslot: any) => {
    const dateKey = timeslot.date.toISOString().split("T")[0];
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push({ hour: timeslot.hour, id: timeslot.id });
    return acc;
  }, {});

  console.log(availableDates);

  return availableDates;
};
