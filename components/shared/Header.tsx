"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AlignJustify, ChevronDown, User, XIcon } from "lucide-react";
import { navItems } from "@/constants";
import Link from "next/link";
import logo from "@/app/assets/images/logo.svg";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { getCurrentUserFromDb } from "@/actions/user";
import { Spinner } from "./Spinner";

type Props = {
  userId: string | null;
  role: "ADMIN" | "USER";
};

export const Header = ({ userId, role }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavDropdownOpen, setIsNavDropdownOpen] = useState(false);
  const navItemsWithoutPages = navItems.slice(0, 4);
  const navItemsWithPages = navItems.slice(4, 7);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 991) {
        setIsNavDropdownOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="bg-white w-container relative py-[12px] px-[20px] sm:py-[20px] z-20 transition-all duration-300 mx-auto flex items-center justify-between">
      <Link href={"/"}>
        <Image src={logo} alt="Logo" width={174} height={29} />
      </Link>
      <div className="flex items-center gap-4">
        <div className="lg:hidden">
          <ClerkLoading>
            <Spinner />
          </ClerkLoading>
          <ClerkLoaded>
            <UserButton />
          </ClerkLoaded>
        </div>
        <div onClick={() => setIsNavDropdownOpen(!isNavDropdownOpen)}>
          {!isNavDropdownOpen ? (
            <AlignJustify className="w-10 h-10 cursor-pointer lg:hidden" />
          ) : (
            <XIcon className="w-10 h-10 cursor-pointer lg:hidden" />
          )}
        </div>
      </div>
      <div
        className={` menu-dropdown ${
          isNavDropdownOpen ? "open" : ""
        } overflow-hidden transition-all duration-300 absolute z-30 top-[100%] left-0 w-full bg-white shadow-2xl `}
      >
        <ul className="flex flex-col items-start p-4">
          {navItemsWithoutPages.map((item) => (
            <li key={item.label} className="py-2 w-full">
              <Link
                href={item.href}
                className="text-black inline-block w-full py-[10px] px-[20px] text-[16px]"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="py-2 w-full">
            <span
              onClick={toggleDropdown}
              className="flex justify-between w-full items-center gap-3 text-black cursor-pointer py-[10px] px-[20px]"
            >
              Pages{" "}
              <ChevronDown
                className={`w-5 h-5 transition-all duration-500 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </span>
            {isDropdownOpen && (
              <ul className="mt-2 bg-white rounded-md">
                {navItemsWithPages.map((item) => (
                  <li
                    key={item.label}
                    className="px-4 py-2 hover:bg-gray-100"
                    onClick={() => setIsNavDropdownOpen(false)}
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
                {role !== null && role === "ADMIN" && (
                  <li
                    className="px-4 py-2 hover:bg-gray-100"
                    onClick={() => setIsNavDropdownOpen(false)}
                  >
                    <Link href={`/dashboard`}>Dashboard</Link>
                  </li>
                )}
              </ul>
            )}
          </li>
          <li className="w-full">
            <Link
              href={`/sign-in`}
              className="text-black inline-block w-full py-[10px] px-[20px] text-[16px]"
            >
              Log In
            </Link>
          </li>
        </ul>
      </div>
      <nav className="hidden lg:block">
        <ul className="flex items-center gap-10">
          {navItemsWithoutPages.map((item) => (
            <li key={item.label}>
              <Link href={item.href} className="mr-6">
                {item.label}
              </Link>
            </li>
          ))}
          <li className="relative">
            <span
              onClick={toggleDropdown}
              className="flex items-center gap-3 cursor-pointer"
            >
              Pages{" "}
              <ChevronDown
                className={`w-5 h-5 transition-all duration-500 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </span>
            {isDropdownOpen && (
              <ul className="absolute top-[45px] right-[-20px] w-[120px] mt-2 bg-white rounded-md shadow-2xl">
                {navItemsWithPages.map((item) => (
                  <li
                    key={item.label}
                    className="px-4 py-2 hover:bg-gray-100 text-[14px]"
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
                {role !== null && role === "ADMIN" && (
                  <li className="px-4 py-2 hover:bg-gray-100 text-[14px]">
                    <Link href={`/dashboard`}>Dashboard</Link>
                  </li>
                )}
              </ul>
            )}
          </li>
          <li>
            {userId ? (
              <ClerkLoaded>
                <UserButton />
              </ClerkLoaded>
            ) : (
              ""
            )}
          </li>

          <li>
            {!userId && (
              <Link
                href={`/sign-in`}
                className="inline-block rounded-[60px] border border-[#009ace] bg-[#009ace] transition-all duration-300 hover:bg-transparent hover:text-black px-[24px] py-[14px] text-white"
              >
                Log In
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};
