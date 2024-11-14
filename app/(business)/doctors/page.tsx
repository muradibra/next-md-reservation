import React from "react";
import { PageHeading } from "@/components/shared/PageHeading";
import { OurDoctors } from "./_components/OurDoctors";
import prisma from "@/lib/prisma";
import { ContactUs } from "@/components/shared/ContactUs";

const DoctorsPage = async ({
  searchParams,
}: {
  searchParams: {
    sort: string;
  };
}) => {
  const { sort } = searchParams;
  const [key, value] = sort ? sort.split("-") : ["createdAt", "asc"];

  const doctors = await prisma.doctor.findMany({
    orderBy: {
      [key]: value,
    },
  });

  return (
    <div>
      <PageHeading pageTitle="Meet Our Doctors" pagePath="Our Doctors" />
      <div className="bg-[#eff6f9]">
        <OurDoctors doctors={doctors} />
        <ContactUs />
      </div>
    </div>
  );
};

export default DoctorsPage;
