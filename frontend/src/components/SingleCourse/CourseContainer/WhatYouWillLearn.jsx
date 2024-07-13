import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";

const WhatYouWillLearn = () => {
  const { selectedCourse } = useSelector((state) => state.course);
  if (!selectedCourse) return null;

  const { whatYouWillLearn: learning } = selectedCourse;

  return (
    <div className="flex w-full p-[2.5rem] flex-col items-center gap-[1.25rem] bg-[rgba(225,247,227,0.4)]">
      <div className="text-left w-[49.5rem] text-[1.5rem] font-inter font-semibold leading-[2rem] tracking-[-0.015rem] text-[#1d2026]">
        What you will learn
      </div>
      <div className="grid grid-cols-2 gap-y-[1.5rem] gap-x-[1.25rem]">
        {learning.map((point, index) => (
          <div key={index} className="flex flex-row gap-2">
            <IoMdCheckmarkCircleOutline className="text-xl text-[#23BD33]" />
            <div className="w-[22rem] text-[#4e5566] font-inter text-sm font-normal leading-6 tracking-tighter">
              {point}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatYouWillLearn;
