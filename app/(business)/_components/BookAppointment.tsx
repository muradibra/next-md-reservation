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

    if (res.ok) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }

    // console.log({ ...values, timeslotId: selectedTimeSlotId });
  }

  console.log(form.formState.errors);

  return (
    <section
      id="book-appointment-section"
      className="py-[60px] sm:py-[80px] md:py-[100px] lg:py-[150px]"
    >
      <div className="w-container">
        <div className="book-appointment-section-inner flex flex-col gap-y-[30px] md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-y-[20px] md:w-[40%]">
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
                        <FormLabel className="md:text-[20px]">Doctor</FormLabel>
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
                        <FormLabel className="block md:text-[20px]">
                          Date
                        </FormLabel>
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
                        <FormLabel className="md:text-[20px]">
                          Message
                        </FormLabel>
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
          <div
            className="opening-and-closing-times rounded-xl w-full p-[15px] gap-[90px] sm:p-[30px] lg:py-[30px] lg:px-[40px] md:w-[55%] bg-slate-500 flex flex-col justify-between "
            style={{
              backgroundImage: `url(${"/app/assets/images/book-image.jpg"})`,
              backgroundSize: "cover",
            }}
          >
            <div className="flex flex-col gap-[10px] text-white">
              <h3 className="text-[20px] lg:text-[24px] ">
                Opening & Closing Times
              </h3>
              <p className="text-[18px] ">
                We strive to make healthcare accessible and convenient for you
              </p>
            </div>

            <div className="bg-gray-300 bg-opacity-60 rounded-xl p-[15px] backdrop-blur-xl flex flex-col gap-3">
              <div className="flex justify-center gap-3">
                <div className="days ">
                  <ul>
                    <li>Monday-Friday</li>
                    <li>Saturday</li>
                    <li>Sunday</li>
                  </ul>
                </div>
                <div className="hours">
                  <ul>
                    <li>9AM-5PM</li>
                    <li>9AM-5PM</li>
                    <li>9AM-5PM</li>
                  </ul>
                </div>
              </div>

              <Button className="bg-[#029ace] rounded-3xl">
                Call +1 (123) 456-7890
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
