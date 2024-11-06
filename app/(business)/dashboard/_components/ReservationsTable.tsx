"use client";

import React, { useState } from "react";
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
import { PencilIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { ReservationDialog } from "./ReservationDialog";
import { cn } from "@/lib/utils";

type Props = {
  reservations: (Reservation & {
    user: User;

    doctor: Doctor;

    timeSlot: TimeSlot;
  })[];
  // updateStatus: (
  //   reservationId: string,
  //   status: string
  // ) => Promise<{ ok: boolean; status: number }>;
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
          <TableHead
            className="text-center"
            //  className="w-[100px]"
          >
            For
          </TableHead>
          <TableHead className="text-center">Email</TableHead>
          <TableHead className="text-center">Doctor</TableHead>
          <TableHead className="text-center">Doctor Department</TableHead>
          <TableHead className="text-center">Date</TableHead>
          <TableHead
            className="text-center"
            //  className="text-right"
          >
            Status
          </TableHead>
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
              {reservation.timeSlot.hour}:00
            </TableCell>
            <TableCell
              className={cn(
                "text-center",
                reservation.status === "confirmed"
                  ? "text-green-500"
                  : reservation.status === "cancelled"
                  ? "text-red-600"
                  : "text-yellow-500"
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
