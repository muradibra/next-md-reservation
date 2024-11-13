import React from "react";
import { WriteReview } from "./_components/WriteReview";
import { getDoctors } from "@/actions/doctor";
import { PageHeading } from "@/components/shared/PageHeading";
import { ContactUs } from "@/components/shared/ContactUs";
import { getCurrentUserFromClerk } from "@/actions/user";

const ReviewPage = async () => {
  const { userId } = await getCurrentUserFromClerk();
  const doctors = await getDoctors();

  return (
    <div>
      <PageHeading pagePath="Reviews" pageTitle="Reviews" />
      <WriteReview doctors={doctors} userId={userId} />
      <ContactUs />
    </div>
  );
};

export default ReviewPage;
