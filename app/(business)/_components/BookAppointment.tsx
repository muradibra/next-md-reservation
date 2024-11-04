"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Doctor } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import icon from "@/app/assets/icons/section-start.svg";

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
import DateTimePicker from "@/components/shared/DateTimePicker";
import { Textarea } from "@/components/ui/textarea";
import { createReservation } from "@/actions/reservation";

const formSchema = z.object({
  doctor: z.string().min(2, {
    message: "Please select a doctor",
  }),
  date: z.string().nonempty({ message: "Date is required" }),
  hour: z.number().min(0, {
    message: "Hour is required",
  }),
  message: z.string().optional(),
});

type Props = {
  doctors: Doctor[];
  userId: string | null;
};

export const BookAppointment = ({ doctors, userId }: Props) => {
  const router = useRouter();
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState<string | null>(
    null
  );
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      doctor: "",
      date: "",
    },
  });

  const setDateAndTime = (date: any, time: number) => {
    form.setValue("date", JSON.stringify(date));
    form.setValue("hour", time);
  };

  const resetDateAndTime = () => {
    form.resetField("date");
    form.resetField("hour");
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!userId) {
      toast.info("You must be signed in to make a reservation");
      router.push("/sign-in");
      return;
    }

    const obj = {
      ...values,
      timeSlotId: selectedTimeSlotId,
      userId,
      status: "pending",
    };

    const res = await createReservation(obj);
    // console.log({ ...values, timeslotId: selectedTimeSlotId });
  }

  console.log(form.formState.errors);

  return (
    <section
      id="book-appointment-section"
      className="py-[60px] sm:py-[80px] md:py-[100px] lg:py-[150px]"
    >
      <div className="w-container">
        <div className="book-appointment-section-inner flex flex-col gap-y-[30px]">
          <div className="flex flex-col gap-y-[20px]">
            <div className="book-appointment-section__header">
              <div className="flex flex-col">
                <div className="flex items-center gap-[10px]">
                  <img src={icon.src} alt="" />
                  <span>Schedule Now</span>
                </div>
                <div>
                  <h2 className="text-[#292929] font-medium leading-[130%] text-[30px] md:text-[40px] lg:text-[50px]">
                    Book an Appointment
                  </h2>
                </div>
              </div>
            </div>

            <div className="book-appointment-section__body">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="doctor"
                    render={() => (
                      <FormItem>
                        <FormLabel>Doctor</FormLabel>
                        <FormControl>
                          {/* <Input placeholder="shadcn" {...field} /> */}
                          <Select
                            onValueChange={(value) => {
                              form.setValue("doctor", value);
                              setSelectedDoctor(value);
                            }}
                          >
                            <SelectTrigger className="">
                              <SelectValue placeholder="Please select a doctor" />
                            </SelectTrigger>
                            <SelectContent>
                              {doctors.map((doctor) => (
                                <SelectItem key={doctor.id} value={doctor.id}>
                                  {doctor.firstName} {doctor.lastName}
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
                        <FormLabel className="block">Date</FormLabel>
                        <FormControl>
                          {/* <Input placeholder="shadcn" {...field} /> */}
                          <DateTimePicker
                            //  form={form}
                            selectedDoctor={selectedDoctor}
                            setDateAndTime={setDateAndTime}
                            resetDateAndTime={resetDateAndTime}
                            setSelectedTimeSlotId={setSelectedTimeSlotId}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Doctor</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Your message..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="w-full py-[14px] text-[16px] px-[24px] bg-[#009ace] rounded-[60px] font-medium"
                    type="submit"
                  >
                    Book Appointment
                  </Button>
                </form>
              </Form>
              {/* <div className="doctor-selection"></div> */}
            </div>
          </div>
          <div className="opening-and-closing-times bg-book-img w-full  ">
            <div className="flex flex-col gap-[10px]">
              <h3>Opening & Closing Times</h3>
              <p>
                We strive to make healthcare accessible and convenient for you
              </p>
            </div>

            <div className="bg-[#ffffffb3] backdrop-blur-[10px] w-[100px] h-[100px]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
