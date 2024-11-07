import Link from "next/link";
import Image from "next/image";
import sectionIcon from "@/app/assets/icons/section-start.svg";
import service1 from "@/app/assets/images/services-thumb01.jpg";
import service2 from "@/app/assets/images/services-thumb02.jpg";
import service3 from "@/app/assets/images/services-thumb03.jpg";
import service4 from "@/app/assets/images/services-thumb04.jpg";
import { MoveRight } from "lucide-react";

export const ServicesSection = () => {
  return (
    <section
      id="services-section"
      className="py-[60px] sm:py-[80px] md:py-[100px] lg:py-[150px] bg-[#eff6f9]"
    >
      <div className="w-container">
        <div className="services-section-inner flex flex-col gap-y-[30px] md:flex-row md:justify-between relative">
          <div className="services-left flex flex-col gap-5 lg:gap-[40px] md:w-[48%] md:sticky md:top-[10%] md:h-[400px]">
            <div className="services-left__section-header ">
              <div className="flex gap-[10px] items-center ">
                <div className="relative w-[16px] h-[17px]">
                  <img
                    src={sectionIcon.src}
                    alt="Icon"
                    className="w-full h-full"
                  />
                </div>
                <span className="text-[#009ace] font-semibold leading-[120%]">
                  Our Services
                </span>
              </div>
              <div className="services-left__title mt-[4px]">
                <h2 className="text-[30px] md:text-[40px] lg:text-[50px] font-medium text-[#292929] leading-[130%] ">
                  Expert Medical Services Tailored To You
                </h2>
              </div>
            </div>
            <div className="services-left__body">
              <p className="services-left__desc text-[#4d4d4d]">
                At NextMD, we offer a wide range of healthcare services designed
                to meet the unique needs of each patient. From preventive care
                to specialized treatments, our team of medical experts is here
                to provide the highest quality care in a compassionate and
                professional environment.
              </p>
            </div>
            <div className="services-left__footer">
              <Link href={""} className="main-btn w-auto">
                View All Services
              </Link>
            </div>
          </div>
          <div className="services-right md:w-[48%] md:flex md:flex-col md:gap-y-[20px] overflow-y-auto ">
            <div className="service-right__card p-[20px] mb-[20px]  bg-white rounded-md flex flex-col sm:flex-row sm:gap-x-[20px] sm:items-center md:flex-col md:items-baseline lg:flex-row lg:items-center">
              <div className="service-right__card-img rounded-md overflow-hidden aspect-[7/8] sm:w-[48%] md:w-full">
                <img
                  src={service1.src}
                  alt="Service"
                  className="rounded-md w-full h-full object-cover"
                />
              </div>
              <div className="service-right__card-content py-[20px] flex flex-col gap-y-[10px] sm:w-[48%] md:w-full">
                <h4 className="text-[20px] font-medium leading-[130%]">
                  Pediatrics
                </h4>
                <p className="text-[#333333] leading-[160%]">
                  Comprehensive care for children, from infancy through
                  adolescence, ensuring their health and development.
                </p>
                <Link
                  href={""}
                  className="flex items-center gap-3 text-[#009ace] font-semibold"
                >
                  View Service
                  <MoveRight />
                </Link>
              </div>
            </div>
            <div className="service-right__card p-[20px] mb-[20px]  bg-white rounded-md flex flex-col sm:flex-row sm:gap-x-[20px] sm:items-center md:flex-col md:items-baseline lg:flex-row lg:items-center">
              <div className="service-right__card-img rounded-md overflow-hidden aspect-[7/8] sm:w-[48%] md:w-full">
                <img
                  src={service2.src}
                  alt="Service"
                  className="rounded-md w-full h-full object-cover"
                />
              </div>
              <div className="service-right__card-content py-[20px] flex flex-col gap-y-[10px] sm:w-[48%] md:w-full">
                <h4 className="text-[20px] font-medium leading-[130%]">
                  Neurology
                </h4>
                <p className="text-[#333333] leading-[160%]">
                  Advanced neurological care for conditions affecting the brain,
                  spine, and nervous system.
                </p>
                <Link
                  href={""}
                  className="flex items-center gap-3 text-[#009ace] font-semibold"
                >
                  View Service
                  <MoveRight />
                </Link>
              </div>
            </div>
            <div className="service-right__card p-[20px] mb-[20px]  bg-white rounded-md flex flex-col sm:flex-row sm:gap-x-[20px] sm:items-center md:flex-col md:items-baseline lg:flex-row lg:items-center">
              <div className="service-right__card-img rounded-md overflow-hidden aspect-[7/8] sm:w-[48%] md:w-full">
                <img
                  src={service3.src}
                  alt="Service"
                  className="rounded-md w-full h-full object-cover"
                />
              </div>
              <div className="service-right__card-content py-[20px] flex flex-col gap-y-[10px] sm:w-[48%] md:w-full">
                <h4 className="text-[20px] font-medium leading-[130%]">
                  Oncology
                </h4>
                <p className="text-[#333333] leading-[160%]">
                  Specialized care for cancer patients, including diagnosis,
                  treatment planning, chemotherapy, and supportive services
                  tailored to individual needs.
                </p>
                <Link
                  href={""}
                  className="flex items-center gap-3 text-[#009ace] font-semibold"
                >
                  View Service
                  <MoveRight />
                </Link>
              </div>
            </div>
            <div className="service-right__card p-[20px] bg-white rounded-md flex flex-col sm:flex-row sm:gap-x-[20px] sm:items-center md:flex-col md:items-baseline lg:flex-row lg:items-center">
              <div className="service-right__card-img rounded-md overflow-hidden aspect-[7/8] sm:w-[48%] md:w-full">
                <img
                  src={service4.src}
                  alt="Service"
                  className="rounded-md w-full h-full object-cover"
                />
              </div>
              <div className="service-right__card-content py-[20px] flex flex-col gap-y-[10px] sm:w-[48%] md:w-full">
                <h4 className="text-[20px] font-medium leading-[130%]">
                  Orthopedics
                </h4>
                <p className="text-[#333333] leading-[160%]">
                  Specialized care for musculoskeletal conditions, including
                  injuries, joint pain, and rehabilitation.
                </p>
                <Link
                  href={""}
                  className="flex items-center gap-3 text-[#009ace] font-semibold"
                >
                  View Service
                  <MoveRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
