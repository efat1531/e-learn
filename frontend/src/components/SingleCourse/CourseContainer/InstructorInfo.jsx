// import TeacherInfoCard from "../../components/uitls/Cards/TeacherInfoCard";
import userData from "../../../../Data/userData.json";
import courseData from "../../../../Data/courseData.json";
import reviewData from "../../../../Data/reviewData.json";
import PropTypes from "prop-types";
import React, { useState } from "react";

import { FaStar } from "react-icons/fa6";
import { MdStar } from "react-icons/md";
import { IoPeopleOutline, IoPlayCircle } from "react-icons/io5";

const InstructorInfo = ({ instructorID }) => {
  const { name, profileImg, designation, bio } =
    getInstructorInfo(instructorID);
  const instructorTotalRating = getTotalRating(instructorID);
  const instructorTotalStudents = totalStudents(instructorID);
  const instructorTotalCourses = totalCourse(instructorID);

  const [isExpanded, setIsExpanded] = useState(false);

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
            <img src={profileImg} />
          </div>
        </div>
        <div className="flex flex-col gap-4 items-start w-[40.5rem]">
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
              <MdStar className="text-Warning-500 text-[1.25rem]" />
              <span className="text-sm text-black font-[500]">
                {instructorTotalRating}
              </span>
              <span className="text-sm text-CustomGray-700 font-[400]">
                Rating
              </span>
            </div>
            <div className="flex gap-1 items-center">
              <IoPeopleOutline className="text-Secondary-500 text-[1.25rem]" />
              <span className="text-sm text-black font-[500]">
                {instructorTotalStudents}
              </span>
              <span className="text-sm text-CustomGray-700 font-[400]">
                Students
              </span>
            </div>
            <div className="flex gap-1 items-center">
              <IoPlayCircle className="text-Primary-500 text-[1.25rem]" />
              <span className="text-sm text-black font-[500]">
                {instructorTotalCourses}
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
            {bio.length > 250 && (
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

InstructorInfo.propTypes = {
  instructorID: PropTypes.string.isRequired,
};

export default InstructorInfo;

const getInstructorInfo = (instructorID) => {
  return userData.find((user) => user.userID === instructorID);
};

const getTotalRating = (instructorID) => {
  const courses = courseData.filter(
    (course) => course.instructor === instructorID
  );
  const courseIDs = courses.map((course) => course.id);
  const reviews = reviewData.filter((review) =>
    courseIDs.includes(review.courseID)
  );
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  return (totalRating / reviews.length).toFixed(1);
};

const totalStudents = (instructorID) => {
  const courses = courseData.filter(
    (course) => course.instructor === instructorID
  );
  const totalStudents = courses.reduce(
    (acc, course) => acc + course.students,
    0
  );
  return totalStudents;
};

const totalCourse = (instructorID) => {
  const courses = courseData.filter(
    (course) => course.instructor === instructorID
  );
  return courses.length;
};
