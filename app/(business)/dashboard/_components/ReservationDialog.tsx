"use client";

import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Pencil2Icon } from "@radix-ui/react-icons";

type Props = {
  updateStatus: (
    reservationId: string,
    status: string
  ) => Promise<{ ok: boolean; status: number }>;
};

export const ReservationDialog = ({ updateStatus }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectValue, setSelectValue] = useState<
    "confirmed" | "cancelled" | null
  >(null);

  const statusUpdate = () => {
    setIsLoading(true);

    setIsLoading(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>
          <Pencil2Icon className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Status</DialogTitle>
        </DialogHeader>

        <h4>Reservation Status</h4>
        <Select
          onValueChange={(value) =>
            setSelectValue(value as "confirmed" | "cancelled")
          }
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <Button>Save</Button>
      </DialogContent>
    </Dialog>
  );
};
