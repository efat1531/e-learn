import React from "react";
import WhyLearnImage from "../../assets/images/WhyLearnBecomeAnInstructor.png";
import { FaCheckCircle } from "react-icons/fa";

const WhyTeach = () => {
  return (
    <section className="flex py-[6.25rem] justify-center items-start gap-[5.35rem]">
      {/* Image */}
      <div className="aspect-auto max-w-[43.625rem] max-h-[36.6875rem]">
        <img
          loading="lazy"
          src={WhyLearnImage}
          alt="Instructor teaching students"
          className="object-cover"
        />
      </div>
      {/* Contents */}
      <div className="flex flex-col items-start gap-8">
        {/* Heading */}
        <div className="flex flex-col items-start gap-6 max-w-[33.5rem]">
          <div className="w-full text-[2.5rem] font-semibold leading-[3rem] tracking-tight">
            Why you’ll start teaching on E-Learn
          </div>
          <div className="w-full text-CustomGray-700 text-xl text-justify">
            Teaching on E-Learn offers you the opportunity to share your
            knowledge and expertise with a global audience. Whether you are an
            experienced professional or a passionate hobbyist, E-Learn provides
            a platform to reach students from all over the world. Join our
            community of instructors and start making a difference today!
          </div>
        </div>
        {/* Success */}
        <div className="flex flex-col gap-6 items-start">
          <SuccessCard
            title="Share your knowledge"
            description="Teaching on E-Learn allows you to share your knowledge and expertise with a global audience."
          />
          <SuccessCard
            title="Reach a global audience"
            description="Reach students from all over the world and make a difference in their lives by sharing your knowledge."
          />
          <SuccessCard
            title="Join a community of instructors"
            description="Join our community of instructors and start making a difference today!"
          />
        </div>
      </div>
    </section>
  );
};

export default WhyTeach;

const SuccessCard = ({ title, description }) => {
  return (
    <div className="flex flex-start gap-4">
      {/* Icon */}
      <div className="flex w-10 h-10 items-center justify-center">
        <FaCheckCircle className="w-full h-full text-Success-500" />
      </div>
      {/* Content */}
      <div className="flex items-start flex-col gap-[0.625rem] max-w-[30rem]">
        <div className="text-[1.125rem] font-medium leading-6">{title}</div>
        <div className="text-CustomGray-600 text-sm leading-[1.375rem] tracking-[-0.00875rem]">
          {description}
        </div>
      </div>
    </div>
  );
};
