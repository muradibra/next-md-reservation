import React from "react";
import prisma from "@/lib/prisma";
import { getCurrentUserFromClerk } from "@/actions/user";
import { ContactUs } from "@/components/shared/ContactUs";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from "moment";
import { PageHeading } from "@/components/shared/PageHeading";

const ReservationsPage = async () => {
  const { userId } = await getCurrentUserFromClerk();

  const userReservations = userId
    ? await prisma.reservation.findMany({
        where: {
          userId,
        },
        include: {
          user: true,
          doctor: true,
          timeSlot: true,
        },
      })
    : [];

  console.log(userReservations);

  return (
    <div>
      <PageHeading pageTitle="Your Reservations" pagePath="Reservations" />
      {!userId ? (
        <div className="w-container">
          <h1 className="text-2xl my-[60px] font-semibold text-center text-[#009ace]">
            To see your reservations, please sign in to your account
          </h1>
        </div>
      ) : (
        <div className="w-container">
          <h1 className="text-2xl font-semibold text-center mt-[60px] mb-[20px] text-[#009ace]">
            Your Reservations
          </h1>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">For</TableHead>
                <TableHead className="text-center">Doctor</TableHead>
                <TableHead className="text-center">Doctor Department</TableHead>
                <TableHead className="text-center">Date</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userReservations.length ? (
                userReservations.map((reservation) => (
                  <TableRow key={reservation.id}>
                    <TableCell className="font-medium ">
                      {reservation.user.name}
                    </TableCell>

                    <TableCell className="text-center">
                      {reservation.doctor.firstName}{" "}
                      {reservation.doctor.lastName}
                    </TableCell>
                    <TableCell className="text-center">
                      {reservation.doctor.specialty}
                    </TableCell>
                    <TableCell className="text-center">
                      {moment(reservation.timeSlot.date).format("MMM Do YY")}{" "}
                      {reservation.timeSlot.hour}
                    </TableCell>
                    <TableCell className="text-center">
                      {reservation.status}
                    </TableCell>
                    <TableCell className="text-center">
                      {reservation.message ? reservation.message : "No message"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableCell className="font-medium text-center" colSpan={6}>
                  You have no reservations
                </TableCell>
              )}
            </TableBody>
          </Table>
        </div>
      )}
      <ContactUs />
    </div>
  );
};

export default ReservationsPage;
