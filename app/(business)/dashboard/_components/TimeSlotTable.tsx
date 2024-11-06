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
import { Doctor, TimeSlot } from "@prisma/client";
import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { deleteTimeSlot } from "@/actions/timeSlot";

type Props = {
  timeSlots: (TimeSlot & {
    doctor: Doctor;
  })[];
  // reservations: (Reservation & {
  //   user: User;

  //   doctor: Doctor;

  //   timeSlot: TimeSlot;
  // })[];
  // updateStatus: (
  //   reservationId: string,
  //   status: string
  // ) => Promise<{ ok: boolean; status: number }>;
};

export const TimeSlotTable = ({ timeSlots }: Props) => {
  console.log(timeSlots);

  const handleTimeSlotDelete = async (slotId: string) => {
    Swal.fire({
      title: "Are you sure?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        await deleteTimeSlot(slotId);

        Swal.fire("Timeslot and its reservations deleted!", "", "success");
      }
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Date</TableHead>
          <TableHead className="text-center">Doctor</TableHead>
          <TableHead className="text-center">Doctor Department</TableHead>
          <TableHead className="text-center">Available</TableHead>
          <TableHead className="text-center"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {timeSlots.map((slot) => (
          <TableRow key={slot.id}>
            <TableCell className="font-medium text-center">
              {moment(slot.date).format("MMM Do YY")} {slot.hour}:00
            </TableCell>
            <TableCell className="text-center">
              {slot.doctor.firstName} {slot.doctor.lastName}
            </TableCell>
            <TableCell className="text-center">
              {slot.doctor.specialty}
            </TableCell>
            <TableCell className={"text-center"}>
              {JSON.stringify(slot.available)}
            </TableCell>
            <TableCell className="text-center">
              {/* <ReservationDialog reservationId={reservation.id} /> */}
              <Button
                onClick={() => handleTimeSlotDelete(slot.id)}
                variant={"destructive"}
                size={"icon"}
              >
                <Trash2Icon className="w-5 h-5" />
              </Button>
            </TableCell>
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
