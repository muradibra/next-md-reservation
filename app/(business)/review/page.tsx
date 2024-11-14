import React from "react";
import { WriteReview } from "./_components/WriteReview";
import { getDoctors } from "@/actions/doctor";
import { PageHeading } from "@/components/shared/PageHeading";
import { ContactUs } from "@/components/shared/ContactUs";
import { getCurrentUserFromClerk } from "@/actions/user";
import { ReviewsSection } from "./_components/ReviewsSection";
import prisma from "@/lib/prisma";

const ReviewPage = async () => {
  const { userId } = await getCurrentUserFromClerk();
  const doctors = await getDoctors();
  const reviews = await prisma.review.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
      doctor: true,
    },
  });

  return (
    <div>
      <PageHeading pagePath="Reviews" pageTitle="Reviews" />
      <ReviewsSection reviews={reviews} />
      <WriteReview doctors={doctors} userId={userId} />
      <ContactUs />
    </div>
  );
};

export default ReviewPage;
