import React from "react";
// import service1 from "@/app/assets/images/services-thumb01.jpg";
import reviewer1 from "@/app/assets/images/review1.jpg";
// import reviewer2 from "@/app/assets/images/review2.jpg";
// import reviewer3 from "@/app/assets/images/review3.jpg";
// import reviewer4 from "@/app/assets/images/review4.jpg";
// import reviewer5 from "@/app/assets/images/review5.jpg";
// import reviewer6 from "@/app/assets/images/review6.jpg";

import icon from "@/app/assets/icons/section-start.svg";
import { Doctor, Review, User } from "@prisma/client";

type ReviewWithUserAndDoctor = Review & {
  user: User;
  doctor: Doctor;
};

type Props = {
  reviews: ReviewWithUserAndDoctor[];
};

export const ReviewsSection = ({ reviews }: Props) => {
  return (
    <section
      id="reviews-section"
      className="bg-[#eff6f9] py-[60px] sm:py-[80px] md:py-[100px] "
    >
      <div className="w-container">
        <div className="reviews-section-inner ">
          <div className="section-header mb-[40px] sm:mb-[50px] md:mb-[60px] lg:mb-[80px]">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div className="flex flex-col md:w-[45%]">
                <div className="flex items-center gap-[10px]">
                  <div className="w-[16px] h-[17px]">
                    <img src={icon.src} alt="" className="w-full h-auto" />
                  </div>
                  <span className="text-[#009ace] font-medium">
                    Testimonials
                  </span>
                </div>
                <div>
                  <h2 className="text-[#292929] font-medium leading-[130%] text-[30px] md:text-[40px] lg:text-[50px]">
                    What our patients say
                  </h2>
                </div>
              </div>
              <p className="md:w-[45%]">
                At NextMD, we value the feedback from our patients and take
                pride in the positive impact we have on their lives.
              </p>
            </div>
          </div>
          <div className="review-cards flex flex-col md:flex-row md:flex-wrap gap-[20px] lg:gap-[30px]">
            {reviews.slice(0, 6).map((review) => (
              <div
                key={review.id}
                className="review__card p-[20px] mb-[20px] cursor-pointer md:w-[48%] bg-white rounded-md flex flex-col sm:flex-row sm:gap-[20px] sm:items-stretch md:flex-col md:items-stretch lg:flex-row lg:items-stretch"
              >
                <div className="review__card-img rounded-md overflow-hidden aspect-[7/8] sm:w-[48%] md:w-full">
                  <img
                    src={reviewer1.src}
                    alt="Service"
                    className="rounded-md w-full h-full object-cover"
                  />
                </div>
                <div className="review__card-content  flex flex-col sm:justify-between gap-y-[30px] sm:w-[48%] md:w-full">
                  <div className="flex flex-col gap-3">
                    <h6 className="font-medium leading-[120%]">
                      {review.title}
                    </h6>
                    <p className="text-[#333333] leading-[160%]">
                      {review.comment}
                      {/* After years of dealing with chronic pain, the specialists
                      at NextMD provided me with a treatment plan that has
                      changed my life. I can&apos;t thank them enough. */}
                    </p>
                  </div>
                  <span className=" font-medium">
                    {review.user.name} <br />
                    (for Dr. {review.doctor.firstName} {review.doctor.lastName})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
