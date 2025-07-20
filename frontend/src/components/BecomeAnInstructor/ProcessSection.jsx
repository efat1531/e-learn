import React from "react";
import { PiNewspaperClippingDuotone } from "react-icons/pi";
import { LiaIdCard } from "react-icons/lia";
import { FaCirclePlay } from "react-icons/fa6";
import { FaHandshake } from "react-icons/fa6";

const ProcessSection = () => {
  return (
    <section className="w-full py-[5rem] flex flex-col justify-center items-center gap-[2.5rem] bg-CustomGray-50">
      {/* Title */}
      <div className="max-w-[33.375rem] text-center">
        <h2>How you'll become successful instructor</h2>
      </div>
      {/* Cards */}
      <div className="flex gap-6 justify-center">
        <ProcessCard
          title="1. Apply to become instructor"
          description="Sit at the edge of the mat. The time of fermentation is here, and the lobsters are enjoying it."
          ReactIcon={PiNewspaperClippingDuotone}
          iconColor="text-Secondary-500"
          iconBackgroundColor="bg-[#564FFD1A]"
        />
        <ProcessCard
          title="2. Setup & edit your profile"
          description="Sit at the edge of the mat. The time of fermentation is here, and the lobsters are enjoying it."
          ReactIcon={LiaIdCard}
          iconColor="text-Error-500"
          iconBackgroundColor="bg-Error-100"
        />
        <ProcessCard
          title="3. Create your new course"
          description="Sit at the edge of the mat. The time of fermentation is here, and the lobsters are enjoying it."
          ReactIcon={FaCirclePlay}
          iconColor="text-Primary-500"
          iconBackgroundColor="bg-Primary-100"
        />
        <ProcessCard
          title="4. Start teaching & earning"
          description="Sit at the edge of the mat. The time of fermentation is here, and the lobsters are enjoying it."
          ReactIcon={FaHandshake}
          iconColor="text-Success-500"
          iconBackgroundColor="bg-Success-100"
        />
      </div>
    </section>
  );
};

export default ProcessSection;

const ProcessCard = ({
  title,
  description,
  ReactIcon,
  iconColor,
  iconBackgroundColor,
}) => {
  return (
    <div className="flex p-6 flex-col justify-center items-center gap-6 bg-white">
      {/* Icon */}
      <div
        className={`flex p-5 justify-start gap-[0.625rem] ${iconBackgroundColor}`}
      >
        <ReactIcon className={`w-10 h-10 ${iconColor}`} />
      </div>
      {/* Content */}
      <div className="flex flex-col justify-center items-center gap-3 max-w-[16.5rem]">
        {/* Title */}
        <div className="w-full text-center text-[1.125rem] font-medium leading-6">
          {title}
        </div>
        {/* Description */}
        <div className="w-full text-sm text-CustomGray-600 text-center">
          {description}
        </div>
      </div>
    </div>
  );
};
