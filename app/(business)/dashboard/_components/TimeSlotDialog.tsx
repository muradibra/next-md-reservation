"use client";

import React, { useCallback, useEffect, useState } from "react";
import { z } from "zod";

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Doctor } from "@prisma/client";

type Props = {
  type: "CREATE" | "UPDATE";
  doctors: Doctor[];
};

import { createTimeSlot, getExistingTimeSlots } from "@/actions/timeSlot";
import { toast } from "sonner";
import moment from "moment";

const formSchema = z.object({
  date: z.string().min(1, "Please select a date"),
  hour: z.string().min(1, "Please select the hour"),
  doctor: z.string().min(1, "Please select a doctor"),
  availability: z
    .boolean()
    .refine((val) => val !== undefined, "Please select availability"),
});

export const TimeSlotDialog = ({ type, doctors }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [existingTimeSlots, setExistingTimeSlots] = useState<{
    [key: string]: string[];
  }>({});
  const dialogType = type === "CREATE" ? "Create Timeslot" : "Update Timeslot";
  const today = moment().format("YYYY-MM-DD");

  useEffect(() => {
    if (selectedDoctor) {
      fetchExistingTimeSlots(selectedDoctor);
    } else {
      setExistingTimeSlots({});
    }
  }, [selectedDoctor]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: "",
      hour: "",
      doctor: "",
      availability: undefined,
    },
  });

  const fetchExistingTimeSlots = async (doctorId: string) => {
    const res = await getExistingTimeSlots(doctorId);

    if (res.ok) {
      const timeSlots =
        res.data?.reduce((acc: { [key: string]: string[] }, slot) => {
          const date = moment(slot.date).format("YYYY-MM-DD");
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(slot.hour);
          return acc;
        }, {}) || {};
      setExistingTimeSlots(timeSlots);
    } else {
      toast.error(res.message);
    }
  };

  const isTimeSlotDisabled = useCallback(
    (date: string, hour: string) => {
      const currentDate = moment().format("YYYY-MM-DD");
      const currentTime = moment().format("HH:mm");
      const slotTime = moment(hour, "HH:mm").format("HH:mm");

      if (date === currentDate && slotTime < currentTime) {
        return true;
      }

      return existingTimeSlots[date]?.includes(hour);
    },
    [existingTimeSlots]
  );

  // const isDateDisabled = (date: string) => {
  //   const workingHours = [
  //     "9:00-10:00",
  //     "10:00-11:00",
  //     "11:00-12:00",
  //     "12:00-13:00",
  //     "13:00-14:00",
  //     "14:00-15:00",
  //     "15:00-16:00",
  //     "16:00-17:00",
  //   ];
  //   return existingTimeSlots[date]?.length === workingHours.length;
  // };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log(values);

    // Convert date to UTC format before sending to the server
    const utcDate = moment(values.date).utc().format("YYYY-MM-DD");
    const updatedValues = { ...values, date: utcDate };

    const res = await createTimeSlot({ values: updatedValues });

    if (res.ok) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }

    setIsLoading(false);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant={"default"}>{dialogType}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogType}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="doctor"
              render={() => (
                <FormItem>
                  <FormLabel>Doctor</FormLabel>
                  <FormControl>
                    <Select
                      value={selectedDoctor || ""}
                      onValueChange={(value) => {
                        form.setValue("doctor", value);
                        setSelectedDoctor(value);
                      }}
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        {doctors.map((doctor) => (
                          <SelectItem key={doctor.id} value={doctor.id}>
                            {doctor.firstName} {doctor.lastName},{" "}
                            {doctor.specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    {/* <Input placeholder="shadcn" {...field} /> */}
                    <Input
                      type="date"
                      min={today}
                      disabled={selectedDoctor ? false : true}
                      {...field}
                      onChange={(e) => {
                        const date = e.target.value;
                        form.setValue("date", date);
                        setExistingTimeSlots((prevSlots) => ({
                          ...prevSlots,
                          [date]: prevSlots[date] || [], // Ensure state consistency
                        }));
                      }}
                      // disabled={isDateDisabled(field.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hour"
              render={() => (
                <FormItem>
                  <FormLabel>Hour</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => form.setValue("hour", value)}
                      disabled={selectedDoctor ? false : true}
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select hour" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "9:00-10:00",
                          "10:00-11:00",
                          "11:00-12:00",
                          "12:00-13:00",
                          "13:00-14:00",
                          "14:00-15:00",
                          "15:00-16:00",
                          "16:00-17:00",
                        ].map((hour) => (
                          <SelectItem
                            key={hour}
                            value={hour.toString()}
                            disabled={isTimeSlotDisabled(
                              form.getValues("date"),
                              hour
                            )}
                          >
                            {hour}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="availability"
              render={() => (
                <FormItem>
                  <FormLabel>Availablitiy</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) =>
                        form.setValue("availability", Boolean(value))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">true</SelectItem>
                        <SelectItem value="false">false</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} className="w-full" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
