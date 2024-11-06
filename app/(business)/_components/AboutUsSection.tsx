import Image from "next/image";
import React from "react";
import mainImg from "@/app/assets/images/about-us.jpg";
import sectionIcon from "@/app/assets/icons/section-start.svg";
import Link from "next/link";

export const AboutUsSection = () => {
  return (
    <section
      id="about-us-section"
      className="py-[60px] sm:py-[80px] md:py-[100px] lg:py-[150px]"
    >
      <div className="w-container">
        <div className="about-us-section-inner flex flex-col gap-10 md:flex-row md:justify-between md:items-center">
          <div className="main-img md:w-[46%]">
            <Image src={mainImg} alt="About Us" layout="" />
          </div>

          <div className="section-data flex flex-col gap-y-[20px] lg:gap-y-[40px] md:w-[46%]">
            <div className="section-header ">
              <div className="flex gap-[10px]">
                <Image src={sectionIcon.src} alt="Icon" layout="" />
                <span className="text-[#009ace] font-semibold leading-[120%]">
                  About Us
                </span>
              </div>
              <div className="section-title mt-[4px]">
                <h2 className="text-[30px] md:text-[40px] lg:text-[50px] font-medium text-[#292929] leading-[130%] ">
                  Trusted Care, Proven Expertise
                </h2>
              </div>
            </div>
            <div className="section-body">
              <p className="section-desc text-[#4d4d4d] ">
                At MextMD, we believe in delivering healthcare that you can
                trust. With a team of highly qualified physicians and medical
                specialists, we are committed to providing comprehensive,
                evidence-based care that leads to real, measurable outcomes. Our
                expertise spans a wide range of medical fields, ensuring that
                every patient receives the highest standard of care, tailored to
                their unique needs.
              </p>
            </div>
            <div className="section-footer flex flex-col gap-y-[5px] sm:flex-row sm:justify-between">
              <div className="max-w-[217px] w-full flex flex-col gap-y-[10px]">
                <h4 className="text-[#292929] font-medium text-[24px] md:text-[28px] lg:text-[32px] ">
                  25+
                </h4>
                <span className="text-[#4d4d4d] md:text-[18px]">
                  Years of Experience
                </span>
              </div>
              <div className="max-w-[217px] w-full flex flex-col gap-y-[10px]">
                <h4 className="text-[#292929] font-medium  text-[24px] md:text-[28px] lg:text-[32px] ">
                  50+
                </h4>
                <span className="text-[#4d4d4d] md:text-[18px]">
                  Expert Specialists
                </span>
              </div>
            </div>
            <div>
              <Link href={""} className="main-btn w-[120px]">
                About Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
