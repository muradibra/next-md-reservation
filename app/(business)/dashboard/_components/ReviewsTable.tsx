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
import { Doctor, Review, User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import Swal from "sweetalert2";
import { deleteReview } from "@/actions/review";

type Props = {
  reviews: (Review & {
    user: User;
    doctor: Doctor;
  })[];
};

export const ReviewsTable = ({ reviews }: Props) => {
  const deleteReviewFromDb = (reviewId: string) => {
    Swal.fire({
      title: "Are you sure?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteReview(reviewId);
        if (res.ok) {
          Swal.fire("Review deleted!", "", "success");
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
          <TableHead className="text-center">User</TableHead>
          <TableHead className="text-center">User Email</TableHead>
          <TableHead className="text-center">For</TableHead>
          <TableHead className="text-center">Review</TableHead>
          <TableHead className="text-center"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reviews.map((review) => (
          <TableRow key={review.id}>
            <TableCell className="font-medium text-center">
              {review.user.name}
            </TableCell>
            <TableCell className="font-medium text-center">
              {review.user.email}
            </TableCell>
            <TableCell className="font-medium text-center">
              {review.doctor.firstName} {review.doctor.lastName}
            </TableCell>
            <TableCell className="font-medium text-center">
              <b>{review.title}</b> - {review.comment}
            </TableCell>
            {/* <TableCell className="font-medium text-center">INV001</TableCell> */}
            <TableCell className="font-medium text-center">
              <Button
                variant={"destructive"}
                size={"icon"}
                onClick={() => deleteReviewFromDb(review.id)}
              >
                <Trash2Icon className="w-4 h-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
