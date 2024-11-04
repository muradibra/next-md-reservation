import React from "react";
import { HomeHero } from "./_components/HomeHero";
import { AboutUsSection } from "./_components/AboutUsSection";
import { ServicesSection } from "./_components/ServicesSection";
import { BookAppointment } from "./_components/BookAppointment";
import { getAvailableDates } from "@/actions/dates";
import { getDoctors } from "@/actions/doctor";
import { getCurrentUser } from "@/actions/user";

const HomePage = async () => {
  const { userId } = await getCurrentUser();
  const doctors = await getDoctors();

  return (
    <div>
      <HomeHero />
      <AboutUsSection />
      <ServicesSection />
      <BookAppointment doctors={doctors} userId={userId} />
    </div>
  );
};

export default HomePage;
