import React from "react";
import { HomeHero } from "./_components/HomeHero";
import { AboutUsSection } from "./_components/AboutUsSection";
import { ServicesSection } from "./_components/ServicesSection";
import { BookAppointment } from "./_components/BookAppointment";
import { getDoctors } from "@/actions/doctor";
import { getCurrentUserFromClerk } from "@/actions/user";

const HomePage = async () => {
  const { userId } = await getCurrentUserFromClerk();
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
