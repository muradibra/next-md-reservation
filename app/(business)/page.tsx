import React from "react";
import { HomeHero } from "./_components/HomeHero";
import { AboutUsSection } from "./_components/AboutUsSection";
import { ServicesSection } from "./_components/ServicesSection";
import { BookAppointment } from "./_components/BookAppointment";

const HomePage = () => {
  return (
    <div>
      <HomeHero />
      <AboutUsSection />
      <ServicesSection />
      <BookAppointment />
    </div>
  );
};

export default HomePage;
