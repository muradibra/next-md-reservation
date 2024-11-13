"use client";

import React, { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createDoctor } from "@/actions/doctor";
import { toast } from "sonner";
import { UploadSingleImage } from "@/components/shared/UploadSingleImage";

type Props = {
  type: "CREATE" | "UPDATE";
};

const formSchema = z.object({
  firstName: z.string().min(1, {
    message: "Firstname is required.",
  }),
  lastName: z.string().min(1, {
    message: "Lastname is required.",
  }),
  specialty: z.string().min(1, {
    message: "Specialty is required.",
  }),
  imgUrl: z.string().min(1, {
    message: "Image URL is required.",
  }),
});

export const DoctorDialog = ({ type }: Props) => {
  const dialogType = type === "CREATE" ? "Create Doctor" : "Update Doctor";
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      specialty: "",
      imgUrl: "",
    },
  });

  const imgUrlValue = form.watch("imgUrl");

  const handleChange = (url: string) => {
    if (url) {
      form.clearErrors("imgUrl");
    }
    form.setValue("imgUrl", url);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const res = await createDoctor({ values });

    if (res.ok) {
      toast.success(res.message);
      form.reset();
      setIsOpen(false);
    } else {
      toast.error(res.message);
    }
    setIsLoading(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>{dialogType}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogType}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Firstname</FormLabel>
                  <FormControl>
                    <Input placeholder="Firstname..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lastname</FormLabel>
                  <FormControl>
                    <Input placeholder="Lastname..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specialty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specialty</FormLabel>
                  <FormControl>
                    <Input placeholder="Specialty..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imgUrl"
              render={() => (
                <FormItem>
                  <FormLabel>Doctor image</FormLabel>
                  <UploadSingleImage
                    url={imgUrlValue}
                    handleChange={handleChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isLoading} className="w-full" type="submit">
              {dialogType}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
