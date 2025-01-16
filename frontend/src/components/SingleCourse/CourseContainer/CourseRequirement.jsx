import { BsFillExclamationCircleFill } from "react-icons/bs";
import React from "react";
import { useSelector } from "react-redux";

const CourseRequirement = () => {
  const { selectedCourse } = useSelector((state) => state.course);
  if (!selectedCourse) return null;
  const { requirements } = selectedCourse;

  return (
    <div className="w-full flex flex-col items-start gap-5">
      <div className="text-center text-[#1d2026] font-inter text-2xl font-semibold leading-8 tracking-tighter">
        Course Requirement
      </div>
      <div className="flex px-8 flex-col gap-3">
        {requirements.map((requirement, index) => (
          <div key={index} className="flex flex-row gap-3 items-center">
            <BsFillExclamationCircleFill className="text-Success-500" />
            <div className="text-gray-700 font-inter text-sm font-normal leading-6 tracking-tight">
              {requirement}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseRequirement;
