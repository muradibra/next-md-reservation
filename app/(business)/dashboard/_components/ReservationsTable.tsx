"use client";

import React from "react";
import moment from "moment";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Doctor, Reservation, TimeSlot, User } from "@prisma/client";
import { ReservationDialog } from "./ReservationDialog";
import { cn } from "@/lib/utils";
import { EStatusType } from "@/types";

type Props = {
  reservations: (Reservation & {
    user: User;

    doctor: Doctor;

    timeSlot: TimeSlot;
  })[];
};

export const ReservationsTable = ({ reservations }: Props) => {
  console.log(reservations);

  // Swal.fire({
  //   title: "Are you sure?",
  //   showCancelButton: true,
  //   confirmButtonText: "Delete",
  //   denyButtonText: `Don't save`,
  // }).then((result) => {
  //   /* Read more about isConfirmed, isDenied below */
  //   if (result.isConfirmed) {
  //     Swal.fire("User deleted!", "", "success");
  //   }
  // });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">For</TableHead>
          <TableHead className="text-center">Email</TableHead>
          <TableHead className="text-center">Doctor</TableHead>
          <TableHead className="text-center">Doctor Department</TableHead>
          <TableHead className="text-center">Date</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reservations.map((reservation) => (
          <TableRow key={reservation.id}>
            <TableCell className="font-medium text-center">
              {reservation.user.name}
            </TableCell>
            <TableCell className="font-medium text-center">
              {reservation.user.email}
            </TableCell>
            <TableCell className="text-center">
              {reservation.doctor.firstName} {reservation.doctor.lastName}
            </TableCell>
            <TableCell className="text-center">
              {reservation.doctor.specialty}
            </TableCell>
            <TableCell className="text-center">
              {moment(reservation.timeSlot.date).format("MMM Do YY")}{" "}
              {reservation.timeSlot.hour}
            </TableCell>
            <TableCell
              className={cn(
                "text-center font-bold",
                reservation.status === EStatusType.CONFIRMED
                  ? "text-green-600"
                  : reservation.status === EStatusType.CANCELLED
                  ? "text-red-600"
                  : reservation.status === EStatusType.PAID
                  ? "text-blue-600"
                  : "text-yellow-600"
              )}
            >
              {reservation.status}
            </TableCell>
            <TableCell className="text-center">
              <ReservationDialog reservationId={reservation.id} />
            </TableCell>
            {/* <TableCell>{user.email}</TableCell>
            <TableCell className="text-center">
              {user?.reservations.length}
            </TableCell>
            <TableCell className="text-center">{user.reviews.length}</TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
{
  /* <TableCell className="flex gap-3 items-center">
  <Button variant={"destructive"} onClick={deleteUser}>
    <Trash2Icon className="w-5 h-5 " />
  </Button>
  <Button variant={"secondary"}>
    <PencilIcon className="w-5 h-5 cursor-pointer" />
  </Button>
</TableCell> */
}
