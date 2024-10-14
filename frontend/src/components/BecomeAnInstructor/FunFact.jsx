import React from "react";
import { LuUsers } from "react-icons/lu";
import { PiNotebookLight, PiSealCheckFill } from "react-icons/pi";
import { BsGlobeAsiaAustralia } from "react-icons/bs";

const FunFact = () => {
  return (
    <section className="flex w-full py-10 items-center justify-center bg-Primary-100">
      <BannerContentCard
        ReactIcon={LuUsers}
        text="67.1k"
        description="Students"
        iconColor="text-Primary-500"
      />
      <BannerContentCard
        ReactIcon={PiNotebookLight}
        text="26.1k"
        description="Certified Instructors"
        iconColor="text-Secondary-500"
      />
      <BannerContentCard
        ReactIcon={BsGlobeAsiaAustralia}
        text="71"
        description="Countries"
        iconColor="text-Primary-500"
      />
      <BannerContentCard
        ReactIcon={PiSealCheckFill}
        text="99.9%"
        description="Success Rate"
        iconColor="text-Success-500"
      />
    </section>
  );
};

export default FunFact;

const BannerContentCard = ({ ReactIcon, text, description, iconColor }) => {
  return (
    <div className="flex items-start gap-4">
      <div
        className={`flex w-10 h-10 justify-center items-center ${iconColor}`}
      >
        <ReactIcon className="w-full h-full" />
      </div>
      <div className="flex flex-col items-start gap-2 w-[13rem]">
        <div className="w-full text-[2rem] font-semibold leading-10 tracking-tight">
          {text}
        </div>
        <div className="w-full text-sm font-medium text-CustomGray-700">
          {description}
        </div>
      </div>
    </div>
  );
};
