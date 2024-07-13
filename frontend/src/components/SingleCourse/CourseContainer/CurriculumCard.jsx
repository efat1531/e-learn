import PropTypes from "prop-types";
import { useState } from "react";
import { MdExpandCircleDown } from "react-icons/md";
import { durationConversion } from "../../../utils/Transformations";
import { FaRegCirclePlay } from "react-icons/fa6";
import { LuClock4 } from "react-icons/lu";
import CourseCurriculumList from "./CurriculumList";
import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCurriculumCard = ({ courseSection }) => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div
        className="w-full p-5 flex justify-between group hover:bg-gray-100 hover:cursor-pointer"
        onClick={toggleOpen}
      >
        <div className="flex flex-row items-center gap-2 ">
          <MdExpandCircleDown
            className={`text-CustomGray-600 text-[1.20rem] group-hover:text-Primary-500 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
          <div className="text-gray-900 font-inter text-base font-normal leading-5 group-hover:text-Primary-500">
            {courseSection.sectionTitle}
          </div>
        </div>
        <div className="flex flex-row items-center gap-4">
          <div className="flex flex-row items-center gap-2">
            <FaRegCirclePlay className="text-Secondary-500 text-[1.25rem]" />
            <div className="text-gray-700  text-sm leading-[1.375rem] tracking-[0.00875rem]">
              {totalLectures(courseSection)} Lessons
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <LuClock4 className="text-Primary-500 text-[1.25rem]" />
            <div className="text-gray-700  text-sm leading-[1.375rem] tracking-[0.00875rem]">
              {durationConversion(totalDuration(courseSection))}
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="flex flex-col items-center gap-4 transition-all w-full ease-in-out duration-300 py-4">
          {courseSection.sectionContainer.map((lesson, index) => (
            <div className="w-full" key={index}>
              <CourseCurriculumList lesson={lesson} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

CourseCurriculumCard.propTypes = {
  courseSection: PropTypes.object.isRequired,
};

export default CourseCurriculumCard;

const totalDuration = (courseSection) => {
  return courseSection.sectionContainer
    .filter((lesson) => lesson.contentType !== "resource")
    .reduce((total, lesson) => total + lesson.contentDuration, 0);
};

const totalLectures = (courseSection) => {
  return courseSection.sectionContainer.filter(
    (lesson) => lesson.contentType !== "resource"
  ).length;
};
