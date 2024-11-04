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
import { Reservation, Review, User } from "@prisma/client";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

type Props = {
  users: (User & { reservations: Reservation[]; reviews: Review[] })[];
};

export const UserTable = ({ users }: Props) => {
  const usersWithoutAdminUser = users.filter((user) => user.role !== "ADMIN");

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
          //  className="w-[100px]"
          >
            Name
          </TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Reservation Count</TableHead>
          <TableHead>Review Count</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {usersWithoutAdminUser.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className="text-center">
              {user?.reservations.length}
            </TableCell>
            <TableCell className="text-center">{user.reviews.length}</TableCell>
            {/* <TableCell className="flex gap-3 items-center">
              <Button variant={"destructive"} onClick={deleteUser}>
                <Trash2Icon className="w-5 h-5 " />
              </Button>
              <Button variant={"secondary"}>
                <PencilIcon className="w-5 h-5 cursor-pointer" />
              </Button>
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
