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
import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { deleteUserFromDbAndClerk } from "@/actions/user";

type Props = {
  users: (User & { reservations: Reservation[]; reviews: Review[] })[];
};

export const UserTable = ({ users }: Props) => {
  const usersWithoutAdminUser = users.filter((user) => user.role !== "ADMIN");

  const deleteUser = (externalId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete user!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserFromDbAndClerk(externalId);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="text-center">Email</TableHead>
          <TableHead className="text-center">Reservation Count</TableHead>
          <TableHead className="text-center">Review Count</TableHead>
          <TableHead className="text-center"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {usersWithoutAdminUser.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell className="text-center">{user.email}</TableCell>
            <TableCell className="text-center">
              {user?.reservations.length}
            </TableCell>
            <TableCell className="text-center">{user.reviews.length}</TableCell>
            <TableCell className="flex gap-3 items-center">
              <Button
                variant={"destructive"}
                onClick={() => deleteUser(user.externalId)}
              >
                <Trash2Icon className="w-5 h-5 " />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
