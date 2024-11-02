"use client";

import React from "react";
import icon from "@/app/assets/icons/section-start.svg";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const BookAppointment = () => {
  return (
    <section
      id="book-appointment-section"
      className="py-[60px] sm:py-[80px] md:py-[100px] lg:py-[150px]"
    >
      <div className="w-container">
        <div className="book-appointment-section-inner">
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
            <div className="doctor-selection">
              <Select>
                <SelectTrigger className="">
                  <SelectValue placeholder="Please select a doctor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
