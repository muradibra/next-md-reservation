import Image from "next/image";
import React from "react";

import logo from "@/app/assets/images/logo.svg";
import {
  Facebook,
  Instagram,
  MailIcon,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-[#eff6f9] ">
      <div className="w-container">
        <div className="pt-[30px] pb-[40px] md:pt-[40px] md:pb-[60px] lg:pt-[60px] lg:pb-[80px] flex flex-col gap-y-[20px] sm:gap-y-[60px] lg:gap-y-[80px] border-b border-slate-300">
          <div className="footer-top flex flex-col gap-5 md:grid md:grid-cols-2 md:line-clamp-3">
            <Image src={logo} alt="Logo" width={174} height={29} />
            <p className="lg:max-w-[628px] text-left text-[17px]">
              Heart health is crucial for overall well-being. Learn how to keep
              your heart healthy with these simple lifestyle changes, expert
              tips, and the latest medical advancements.
            </p>
          </div>

          <div className="contact-info flex flex-col gap-5 md:gap-[30px] lg:gap-[40px] md:flex-row md:justify-between">
            <div className="flex flex-col lg:gap-y-3">
              <div className="flex gap-2 items-baseline max-w-[242px] lg:max-w-[300px]">
                <div className="border border-slate-300 rounded-[50%] p-0.5 flex items-center justify-center">
                  <MapPin className="w-4 h-4 " />
                </div>
                <span>121, King Street Melbound,3000 , Australia</span>
              </div>
              <div className="flex gap-2 items-baseline max-w-[242px] lg:max-w-[300px]">
                <div className="border border-slate-300 rounded-[50%] p-0.5 flex items-center justify-center">
                  <MailIcon className="w-4 h-4 " />
                </div>
                <span>hello@example.com</span>
              </div>
              <div className="flex gap-2 items-baseline max-w-[242px] lg:max-w-[300px]">
                <div className="border border-slate-300 rounded-[50%] p-0.5 flex items-center justify-center">
                  <Phone className="w-4 h-4 " />
                </div>
                <span>+1 234 567 8900</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-between  md:flex-nowrap md:w-full md:gap-[30px] gap-y-5">
              <ul className="w-[48%] sm:w-[31%] flex flex-col gap-[10px]">
                <li>
                  <Link href={""}>About Us</Link>
                </li>
                <li>
                  <Link href={""}>Services</Link>
                </li>
                <li>
                  <Link href={""}>Doctors</Link>
                </li>
                <li>
                  <Link href={""}>Blogs</Link>
                </li>
                <li>
                  <Link href={""}>FAQ’s</Link>
                </li>
              </ul>
              <ul className="w-[48%] sm:w-[31%] flex flex-col gap-[10px]">
                <li>
                  <Link href={""}>Contact Us</Link>
                </li>
                <li>
                  <Link href={""}>Appointment</Link>
                </li>
                <li>
                  <Link href={""}>Privacy Policy</Link>
                </li>
                <li>
                  <Link href={""}>Terms & Conditions</Link>
                </li>
              </ul>
              <ul className="w-[48%] sm:w-[31%] flex flex-col gap-[10px]">
                <li>
                  <Link href={""}>Style Guide</Link>
                </li>
                <li>
                  <Link href={""}>Licensing</Link>
                </li>
                <li>
                  <Link href={""}>Changelog</Link>
                </li>
                <li>
                  <Link href={""}>Error 404</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="py-[20px] flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
          <div className="flex flex-col md:flex-row md:gap-5">
            <h5>© 2024 NextMD.</h5>
            <p>Work by Murad. Made with Next.js</p>
          </div>
          <div>
            <ul className="flex items-center gap-3">
              <li className="border border-slate-300 rounded-[50%] p-1 cursor-pointer">
                <Youtube className="w-5 h-5" />
              </li>
              <li className="border border-slate-300 rounded-[50%] p-1 cursor-pointer">
                <Twitter className="w-5 h-5" />
              </li>
              <li className="border border-slate-300 rounded-[50%] p-1 cursor-pointer">
                <Instagram className="w-5 h-5" />
              </li>
              <li className="border border-slate-300 rounded-[50%] p-1 cursor-pointer">
                <Facebook className="w-5 h-5" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
