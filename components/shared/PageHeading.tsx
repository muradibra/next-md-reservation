import Link from "next/link";
import React from "react";

type Props = {
  pageTitle: string;
  pagePath: string;
};

export const PageHeading = ({ pageTitle, pagePath }: Props) => {
  return (
    <section
      id="page-heading"
      className="py-[40px] sm:py-[60px] md:py-[40px] bg-[#009ace]"
    >
      <div className="w-container">
        <div className="page-heading-inner">
          <h2 className="text-white text-[30px] md:text-[40px] lg:text-[50px] font-medium ">
            {pageTitle}
          </h2>
          <div className="flex items-center gap-1">
            <Link
              className="text-white text-[16px] sm:text-[18px] sm:leading-[160%]  "
              href={"/"}
            >
              Home
            </Link>
            <span className="text-white text-[16px] sm:text-[18px] sm:leading-[160%]  ">
              +
            </span>
            <span className="text-white text-[16px] sm:text-[18px] sm:leading-[160%]  ">
              {pagePath}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
