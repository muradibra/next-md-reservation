"use client";

import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
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
import { updateStatus } from "@/actions/reservation";
import { toast } from "sonner";
import { EStatusType } from "@/types";

type Props = {
  reservationId: string;
  // updateStatus: (
  //   reservationId: string,
  //   status: string
  // ) => Promise<{ ok: boolean; status: number }>;
};

export const ReservationDialog = ({ reservationId }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectValue, setSelectValue] = useState<
    EStatusType.CANCELLED | EStatusType.CONFIRMED | null
  >(null);

  const statusUpdate = async () => {
    setIsLoading(true);
    const resp = await updateStatus(reservationId, selectValue!);
    if (resp.ok) {
      toast.success("Reservation status updated");
      setIsDialogOpen(false);
    } else {
      toast.error("Error occurred while updating status");
    }
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
            setSelectValue(
              value as EStatusType.CANCELLED | EStatusType.CONFIRMED
            )
          }
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={EStatusType.CONFIRMED}>Confirmed</SelectItem>
            <SelectItem value={EStatusType.CANCELLED}>Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <Button disabled={isLoading} onClick={statusUpdate}>
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
};
