"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import icon from "@/app/assets/icons/section-start.svg";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Doctor } from "@prisma/client";
import { RatingComponent } from "./RatingComponent";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { postReview } from "@/actions/review";

const formSchema = z.object({
  doctor: z.string().min(1, {
    message: "Doctor is required.",
  }),
  rating: z.number().min(1, {
    message: "Rating is required.",
  }),
  title: z.string().min(1, {
    message: "Title is required.",
  }),
  comment: z.string().min(1, {
    message: "Comment is required.",
  }),
});

type Props = {
  doctors: Doctor[];
  userId: string | null;
};

export const WriteReview = ({ doctors, userId }: Props) => {
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [value, setValue] = useState(0);
  const router = useRouter();

  useEffect(() => {
    form.setValue("rating", value);
  }, [value]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      doctor: "",
      rating: 0,
      title: "",
      comment: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!userId) {
      toast.info("You must be signed in to make a reservation");
      router.push("/sign-in");
      return;
    }

    const obj = {
      ...values,
      userId,
    };

    const res = await postReview({ obj });

    if (res.ok) {
      toast.success(res.message);
      form.reset();
      setValue(0);
      setSelectedDoctor(null);
    } else {
      toast.error(res.message);
    }
  }

  return (
    <section
      // id="book-appointment-section"
      className="py-[60px] sm:py-[80px] md:py-[100px] "
    >
      <div className="w-container">
        <div className="book-appointment-section-inner flex flex-col gap-y-[30px] md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-y-[20px] md:w-[40%]">
            <div className="book-appointment-section__header">
              <div className="flex flex-col">
                <div className="flex items-center gap-[10px]  ">
                  <div className="w-[16px] h-[17px]">
                    <img src={icon.src} alt="" className="w-full h-auto" />
                  </div>
                  <span className="text-[#009ace] font-medium ">Review</span>
                </div>
                <div>
                  <h2 className="text-[#292929] font-medium leading-[130%] text-[30px] md:text-[40px] lg:text-[50px]">
                    Write a Review
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
                          <Select
                            value={selectedDoctor || ""}
                            onValueChange={(value) => {
                              form.setValue("doctor", value);
                              setSelectedDoctor(value);
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Please select a doctor" />
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
                    name="rating"
                    render={() => (
                      <FormItem>
                        <FormLabel className="block md:text-[20px]">
                          Rating
                        </FormLabel>
                        <FormControl>
                          {/* <CAlert color="red" content="salam" about="ssss"  /> */}
                          <RatingComponent value={value} setValue={setValue} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="md:text-[20px]">
                          Review Title
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Your title..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="md:text-[20px]">
                          Review Comment
                        </FormLabel>
                        <FormControl>
                          <Textarea placeholder="Your message..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="w-full px-[14px] py-[24px] text-[16px] bg-[#009ace] rounded-[60px] font-medium"
                    type="submit"
                  >
                    Post Review
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          <div
            className="opening-and-closing-times rounded-xl w-full p-[15px] gap-[90px] sm:p-[30px] lg:py-[30px] lg:px-[40px] md:w-[55%] bg-slate-500 flex flex-col justify-between "
            style={{
              // backgroundImage: `url(${"/app/assets/images/book-image.jpg"})`,
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
