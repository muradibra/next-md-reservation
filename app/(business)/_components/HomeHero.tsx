import React from "react";
import HeroImg from "@/app/assets/images/hero.png";
import Image from "next/image";
import Link from "next/link";

export const HomeHero = () => {
  return (
    <section id="home-hero-section" className="bg-[#eff6f9] ">
      <div className="hero-inner w-container py-[80px] flex flex-col  md:flex-row md:justify-between md:items-center">
        <div className="hero-img md:order-2 lg:w-[50%] max-w-[568px] mx-auto">
          <img src={HeroImg.src} alt="Hero" className="w-full h-full" />
        </div>
        <div className="hero-data flex flex-col gap-y-7 md:order-1 lg:w-[50%]">
          <div className="title-desc flex flex-col gap-y-5">
            <h1 className="hero-title text-[40px] md:text-[48px] lg:text-[68px]  font-medium text-[#292929] leading-[130%] ">
              Compassionate Healthcare, Advanced Solutions
            </h1>
            <p className="hero-description text-[#4d4d4d]">
              At NextMD we believe in offering patient-centric care that
              combines advanced medical technologies with the
            </p>
          </div>
          <Link
            href={""}
            className="w-[194px] inline-block rounded-[60px] border border-[#009ace] bg-[#009ace] transition-all duration-300 hover:bg-transparent hover:text-black px-[24px] py-[14px] text-white"
          >
            Make Appointment
          </Link>
          <div className="customer-data flex justify-between items-center">
            <div>
              <h3 className="text-[24px] md:text-[28px] lg:text-[32px] text-[#292929]">
                90%
              </h3>
              <span className="text-[#4d4d4d]">Patient satisfaction</span>
            </div>
            <div>
              <h3 className="text-[24px] md:text-[28px] lg:text-[32px] text-[#292929]">
                100k+
              </h3>
              <span className="text-[#4d4d4d]">Patient on platfrom</span>
            </div>
            <div>
              <h3 className="text-[24px] md:text-[28px] lg:text-[32px] text-[#292929]">
                1,5k+
              </h3>
              <span className="text-[#4d4d4d]">Hospital cooperate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
