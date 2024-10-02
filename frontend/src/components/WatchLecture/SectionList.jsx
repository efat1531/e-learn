/* eslint-disable react/prop-types */
import { FaRegCirclePlay } from "react-icons/fa6";
import { LuClock4 } from "react-icons/lu";
import { durationConversion } from "../../utils/Transformations";
import LectureList from "./LectureList";
import { useState } from "react";

const SectionList = ({ courseSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border">
      <div
        className="w-full p-5 flex justify-between group hover:bg-gray-100 hover:cursor-pointer "
        onClick={toggleOpen}
      >
        <div className="flex flex-row items-center gap-2 ">
          <div className="text-gray-900 font-inter text-base font-normal leading-5 group-hover:text-Primary-500">
            {courseSection.sectionTitle}
          </div>
        </div>
        <div className="flex flex-row items-center gap-4">
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
              <LectureList lesson={lesson} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default SectionList;

const totalDuration = (courseSection) => {
  return courseSection.sectionContainer
    .filter((lesson) => lesson.content_id.contentType !== "resource")
    .reduce((total, lesson) => total + lesson.content_id.contentDuration, 0);
};

const totalLectures = (courseSection) => {
  return courseSection.sectionContainer.filter(
    (lesson) => lesson.content_id.contentType !== "resource"
  ).length;
};
