import React from "react";
import { Link } from "react-router-dom";
import StarRatingCard from "../../ui/StarRatingCard";
import { useSelector } from "react-redux";

const CourseTitle = () => {
  const { selectedCourse } = useSelector((state) => state.course);

  if (!selectedCourse) return null;

  const { title, summary, instructor, courseRating, numberOfRating } =
    selectedCourse;

  return (
    <div className="flex flex-col justify-start items-start w-full gap-[1.5rem] pb-2">
      {/* Breadcums */}
      <div className="breadcrumbs text-sm">
        <ul>
          <li className="no-underline hover:no-underline">
            <Link to="/" className="hover:no-underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/courses">Courses</Link>
          </li>
          <li>
            <Link to="#">{`Development`}</Link>
          </li>
        </ul>
      </div>

      {/* Title */}
      <div className="text-[#1d2026] font-inter font-semibold text-[2rem] leading-[2.5rem]">
        {title}
      </div>
      {/* Summary */}
      <div className="text-[#4e5566] font-inter font-normal text-[1.25rem] leading-[2rem]">
        {summary}
      </div>
      {/* Teacher and Rating*/}
      <div className="flex justify-between items-center w-full">
        {/* Teacher Info */}
        <div className="flex justify-center items-center gap-[0.75rem]">
          {/* Profile Img */}
          <div className="w-[3.125rem] h-[3.125rem] shrink-0">
            <img
              src={`${instructor.profilePicture}`}
              alt="Teacher"
              className="w-[3.125rem] h-[3.125rem] rounded-full border-2 border-white"
            />
          </div>
          {/* Teacher Name */}
          <div className="flex flex-col">
            <div className="text-[#6e7485] font-inter font-normal text-[0.875rem] leading-[1.375rem]">
              Created By
            </div>
            <div className="text-[#1d2026] font-inter font-medium text-[1rem] leading-[1.375rem]">
              {instructor.name}
            </div>
          </div>
        </div>
        {/* Rating */}
        <div className="flex justify-center items-center gap-[0.5rem]">
          {/* star */}
          <StarRatingCard rating={courseRating} size="1.2rem" />
          {/* Rating */}
          <div className="text-[#1d2026] font-inter font-medium text-[1rem] leading-[1.375rem]">
            {courseRating}
          </div>
          {/* Number of Ratings */}
          <div className="text-[#6e7485] font-inter font-normal text-[0.875rem] leading-[1.375rem]">
            ({numberOfRating}&nbsp;students)
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseTitle;
