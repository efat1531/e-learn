import React from "react";
import PropTypes from "prop-types";
import { IoFolderOpenOutline } from "react-icons/io5";
import { FaCirclePlay } from "react-icons/fa6";
import { durationConversion } from "../../../utils/Transformations";
import { LuClock4 } from "react-icons/lu";
import CourseCurriculumCard from "./CurriculumCard";

const Curriculum = ({ curriculum }) => {
  const totalSections = curriculum.length;
  const totalDuration = curriculum.reduce(
    (acc, curr) =>
      acc +
      curr.lessons
        .filter((lesson) => lesson.type !== "resource")
        .reduce((total, lesson) => total + (lesson.duration || 0), 0),
    0
  );
  const totalLesson = curriculum.reduce(
    (acc, curr) =>
      acc + curr.lessons.filter((lesson) => lesson.type !== "resource").length,
    0
  );

  const convertDuration = durationConversion(totalDuration);

  return (
    <div className="flex flex-col gap-5 items-start w-full">
      <div className="flex flex-row justify-between items-center w-full">
        <div className="text-center text-gray-900 font-inter text-3xl font-semibold leading-8 tracking-tighter">
          Curriculum
        </div>
        <div className="flex flex-row items-center gap-4">
          <div className="flex flex-row items-center gap-2">
            <IoFolderOpenOutline className="text-[#FF6636] text-[1.25rem]" />
            <div className="text-gray-700  text-sm leading-[1.375rem] tracking-[0.00875rem]">
              {totalSections} Sections
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <FaCirclePlay className="text-Secondary-500 text-[1.25rem]" />
            <div className="text-gray-700  text-sm leading-[1.375rem] tracking-[0.00875rem]">
              {totalLesson} Lessons
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <LuClock4 className="text-[#FF6636] text-[1.25rem]" />
            <div className="text-gray-700  text-sm leading-[1.375rem] tracking-[0.00875rem]">
              {convertDuration}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center border border-gray-100 bg-white w-full shadow-md">
        {curriculum.map((section, index) => (
          <div key={index} className="w-full">
            <CourseCurriculumCard courseSection={section} />
            <div className="border-t border-gray-100 w-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

Curriculum.propTypes = {
  curriculum: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Curriculum;
