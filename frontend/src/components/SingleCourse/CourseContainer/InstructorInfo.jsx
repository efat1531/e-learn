import React, { useState } from "react";

import { GoStarFill } from "react-icons/go";
import { IoPeopleOutline, IoPlayCircle } from "react-icons/io5";
import { useSelector } from "react-redux";

const InstructorInfo = () => {
  const { selectedCourse } = useSelector((state) => state.course);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!selectedCourse) return null;

  if (!selectedCourse || !selectedCourse.instructor) return null;

  const {
    rating,
    numberOfStudents,
    name,
    numOfCourses,
    profilePicture,
    bio,
    designation,
  } = selectedCourse.instructor;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col w-full gap-5">
      <div className="text-[#1d2026] text-[1.5rem] font-semibold leading-[2rem] tracking-[-0.015rem]">
        Course Instructor
      </div>
      <div className="flex p-8 items-start gap-6 border border-gray-100 bg-white shadow-md">
        <div className="avatar">
          <div className="w-[8.5rem] rounded-full">
            <img src={profilePicture} />
          </div>
        </div>
        <div className="flex flex-col gap-4 items-TypeError: Cannot read properties of undefined (reading 'toFixed')start w-[40.5rem]">
          <div className="flex gap-1.5 flex-col">
            <div className="text-gray-900 font-Inter text-[1.25rem] font-semibold leading-7">
              {name}
            </div>
            <div className="text-gray-600 font-Inter text-[0.875rem] font-normal leading-5 tracking-tight">
              {designation}
            </div>
          </div>
          <div className="flex gap-6 items-center">
            {/* Text Labels */}
            <div className="flex gap-1 items-center">
              <GoStarFill className="text-Warning-500 text-[1.25rem]" />
              <span className="text-sm text-black font-[500]">
                {rating.toFixed(1)}
              </span>
              <span className="text-sm text-CustomGray-700 font-[400]">
                Rating
              </span>
            </div>
            <div className="flex gap-1 items-center">
              <IoPeopleOutline className="text-Secondary-500 text-[1.25rem]" />
              <span className="text-sm text-black font-[500]">
                {numberOfStudents}
              </span>
              <span className="text-sm text-CustomGray-700 font-[400]">
                Students
              </span>
            </div>
            <div className="flex gap-1 items-center">
              <IoPlayCircle className="text-Primary-500 text-[1.25rem]" />
              <span className="text-sm text-black font-[500]">
                {numOfCourses}
              </span>
              <span className="text-sm text-CustomGray-700 font-[400]">
                Courses
              </span>
            </div>
          </div>
          <div className="text-gray-600 font-Inter text-[0.875rem] font-normal leading-5 tracking-tight w-full text-justify">
            <div
              className={`${
                isExpanded ? "w-full" : "line-clamp-3 text-ellipsis"
              }`}
            >
              {bio}
            </div>
            {bio?.length > 250 && (
              <div className="flex justify-end">
                <button
                  onClick={toggleExpanded}
                  className="flex gap-4 py-2 px-4 items-center bg-transparent border-none text-gray-500 cursor-pointer hover:text-orange-500 transition-colors duration-300 ease-in-out"
                >
                  {isExpanded ? "Read Less" : "Read More"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorInfo;
