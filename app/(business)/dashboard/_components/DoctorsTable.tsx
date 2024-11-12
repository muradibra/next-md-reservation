"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Doctor as PrismaDoctor, Review, Reservation } from "@prisma/client";
import Image from "next/image";

type Doctor = PrismaDoctor & {
  reviews: Review[];
  reservations: Reservation[];
};

type Props = {
  doctors: Doctor[];
};

export const DoctorsTable = ({ doctors }: Props) => {
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
          <TableHead className="text-center">Image</TableHead>
          <TableHead className="text-center">Firstname</TableHead>
          <TableHead className="text-center">Lastname</TableHead>
          <TableHead className="text-center">Specialty</TableHead>
          <TableHead className="text-center">Review Count</TableHead>
          <TableHead className="text-center">Reservation Count</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {doctors.map((doctor) => (
          <TableRow key={doctor.id}>
            <TableCell className="flex justify-center">
              <Image
                width={70}
                height={70}
                src={doctor.imgUrl}
                alt="doctor"
                className=" rounded-lg"
              />
            </TableCell>
            <TableCell className="text-center">{doctor.firstName}</TableCell>
            <TableCell className="text-center">{doctor.lastName}</TableCell>
            <TableCell className="text-center">{doctor.specialty}</TableCell>
            <TableCell className="text-center">
              {doctor.reviews.length}
            </TableCell>
            <TableCell className="text-center">
              {doctor.reservations.length}
            </TableCell>
            <TableCell className="text-center">
              {/* <DoctorDialog type="UPDATE" /> */}
            </TableCell>
          </TableRow>
        ))}
        {/* {reservations.map((reservation) => (
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
                reservation.status === EStatusType.CONFIRMED
                  ? "text-green-500"
                  : reservation.status === EStatusType.CANCELLED
                  ? "text-red-600"
                  : "text-yellow-500"
              )}
            >
              {reservation.status}
            </TableCell>
            <TableCell className="text-center">
              <ReservationDialog reservationId={reservation.id} />
            </TableCell>
          </TableRow>
        ))} */}
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
