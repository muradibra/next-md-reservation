"use client";

import React from "react";
import { Doctor } from "@prisma/client";
import icon from "@/app/assets/icons/section-start.svg";
import { SortComponent } from "./SortComponent";

type Props = {
  doctors: Doctor[];
};

export const OurDoctors = ({ doctors }: Props) => {
  return (
    <section
      id="doctors-section"
      className="bg-[#eff6f9] py-[60px] sm:py-[80px] md:py-[100px]"
    >
      <div className="w-container">
        <div className="doctors-section-inner">
          <div className="reviews-section-inner ">
            <div className="section-header mb-[40px] sm:mb-[50px] md:mb-[60px] lg:mb-[80px]">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div className="flex flex-col md:w-[45%]">
                  <div className="flex items-center gap-[10px]">
                    <div className="w-[16px] h-[17px]">
                      <img src={icon.src} alt="" className="w-full h-auto" />
                    </div>
                    <span className="text-[#009ace] font-medium">Our Team</span>
                  </div>
                  <div>
                    <h2 className="text-[#292929] font-medium leading-[130%] text-[30px] md:text-[40px] lg:text-[50px]">
                      Meet Our Doctors
                    </h2>
                  </div>
                </div>
                <p className="md:w-[45%]">
                  Each member brings a wealth of experience, expertise, and a
                  compassionate approach to patient care.
                </p>
              </div>
            </div>
            <div className="sm:flex sm:justify-end">
              <SortComponent />
            </div>

            <div className="doctors flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-between">
              {doctors.slice(0, 8).map((doctor) => (
                <div
                  key={doctor.id}
                  className="doctor p-[15px] bg-white rounded-lg flex flex-col gap-2 sm:w-[48%] md:w-[23%]"
                >
                  <div className="doctor__img">
                    <img
                      src={doctor.imgUrl}
                      alt="Doctor"
                      className="rounded-md  object-cover"
                    />
                  </div>
                  <div className="doctor__info flex flex-col gap-[6px]">
                    <h4 className="font-medium text-[#292929] leading-[120%]">
                      {doctor.firstName} {doctor.lastName}
                    </h4>
                    <p className="text-[#4d4d4d] text-[14px] leading-[120%]">
                      {doctor.specialty}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
