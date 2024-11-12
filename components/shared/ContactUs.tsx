import React from "react";
import sectionIcon from "@/app/assets/icons/section-start.svg";
import Link from "next/link";
import contactUsHero from "@/app/assets/images/contact-us-hero.png";
import contactUsHeroBg from "@/app/assets/images/contact-us-hero-bg.png";

export const ContactUs = () => {
  return (
    <section
      id="contact-us-section"
      className="py-[60px] sm:py-[80px] md:py-[100px] "
    >
      <div className="w-container">
        <div className="contact-us-section-inner flex flex-col md:flex-row md:items-center md:gap-[60px] lg:gap-[90px]">
          <div className="contact-us__left max-w-[788px] flex flex-col gap-y-[20px] sm:gap-y-[30px] lg:gap-y-[40px]">
            <div className="flex flex-col gap-y-[16px]">
              <div className="left-header">
                <div className="flex flex-col gap-y-[4px]">
                  <div className="flex items-center gap-[10px]">
                    <img src={sectionIcon.src} alt="Icon" />
                    <h5 className="text-bold text-[#009ace] font-medium">
                      Contact Us
                    </h5>
                  </div>
                  <h2 className="text-[#292929] text-[30px] md:text-[40px] lg:text-[50px] font-medium leading-[130%] ">
                    Start Your Wellness Journey Now
                  </h2>
                </div>
              </div>
              <div className="left__body">
                <p>
                  Whether you need to schedule an appointment, ask a question,
                  or seek immediate assistance, we&apos;re here to help.
                </p>
              </div>
            </div>
            <div className="left__footer">
              <Link
                href={"/contact"}
                className=" inline-block rounded-[60px] border border-[#009ace] bg-[#009ace] transition-all duration-300 hover:bg-transparent hover:text-black px-[24px] py-[14px] text-white"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="contact-us__right relative max-w-[418px] ">
            <img
              src={contactUsHero.src}
              alt="Contact Us"
              className="object-cover w-full h-full"
            />
            <img
              src={contactUsHeroBg.src}
              alt="Bg"
              className="absolute z-[-1] top-0 left-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
