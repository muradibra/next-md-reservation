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
import { DoctorDialog } from "./DoctorDialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import Swal from "sweetalert2";
import { deleteDoctor } from "@/actions/doctor";

type Doctor = PrismaDoctor & {
  reviews: Review[];
  reservations: Reservation[];
};

type Props = {
  doctors: Doctor[];
};

export const DoctorsTable = ({ doctors }: Props) => {
  const handleDoctorDelete = (doctorId: string) => {
    Swal.fire({
      title: "Are you sure?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteDoctor(doctorId);
        if (res.ok) {
          Swal.fire("Doctor deleted!", "", "success");
        } else {
          Swal.fire("Failed to delete user", "", "error");
        }
      }
    });
  };

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
            <TableCell className="text-center ">
              <DoctorDialog type="UPDATE" doctor={doctor} />
              <Button
                variant={"destructive"}
                className="py-[8px] px-[16px] ml-[5px]"
                onClick={() => handleDoctorDelete(doctor?.id)}
              >
                <Trash2Icon className="w-4 h-4" />
              </Button>
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
