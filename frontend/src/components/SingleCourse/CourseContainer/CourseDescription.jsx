import React from "react";
import { textToParagraphs } from "../../../utils/Transformations";
import { useSelector } from "react-redux";

const CourseDescription = () => {
  const { selectedCourse } = useSelector((state) => state.course);
  if (!selectedCourse) return null;

  const { description } = selectedCourse;

  const formattedDescription = textToParagraphs(description);
  return (
    <div className="w-full flex flex-col gap-6 items-start">
      <div className="text-CustomGray-900 font-inter text-[1.5rem] font-semibold leading-[2rem] -tracking-[0.015rem]">
        Description
      </div>
      <div className="text-CustomGray-700 font-inter text-[0.875rem] font-normal leading-[1.375rem] -tracking-[0.00875rem] text-justify">
        {formattedDescription.map((para, index) => (
          <p key={index}>{para}</p>
        ))}
      </div>
    </div>
  );
};

export default CourseDescription;
