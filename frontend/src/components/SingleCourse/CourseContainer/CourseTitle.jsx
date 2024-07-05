import React from "react";
import PropTypes from "prop-types";
import userData from "../../../../Data/userData.json";
import { Link } from "react-router-dom";
import StarRatingCard from "../../ui/RatingCard";

const CourseTitle = ({ course }) => {
  const instructorInfo = userData.find(
    (user) => user.userID === course.instructor
  );

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
            <Link to="#">{course.category.name}</Link>
          </li>
        </ul>
      </div>

      {/* Title */}
      <div className="text-[#1d2026] font-inter font-semibold text-[2rem] leading-[2.5rem]">
        {course.title}
      </div>
      {/* Summary */}
      <div className="text-[#4e5566] font-inter font-normal text-[1.25rem] leading-[2rem]">
        {course.summary}
      </div>
      {/* Teacher and Rating*/}
      <div className="flex justify-between items-center w-full">
        {/* Teacher Info */}
        <div className="flex justify-center items-center gap-[0.75rem]">
          {/* Profile Img */}
          <div className="w-[3.125rem] h-[3.125rem] shrink-0">
            <img
              src={instructorInfo.profileImg}
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
              {instructorInfo.name}
            </div>
          </div>
        </div>
        {/* Rating */}
        <div className="flex justify-center items-center gap-[0.5rem]">
          {/* star */}
          <StarRatingCard rating={course.rating} size="1.2rem" />
          {/* Rating */}
          <div className="text-[#1d2026] font-inter font-medium text-[1rem] leading-[1.375rem]">
            {course.rating}
          </div>
          {/* Number of Ratings */}
          <div className="text-[#6e7485] font-inter font-normal text-[0.875rem] leading-[1.375rem]">
            ({course.numOfRating}&nbsp;students)
          </div>
        </div>
      </div>
    </div>
  );
};

CourseTitle.propTypes = {
  course: PropTypes.object.isRequired,
};

export default CourseTitle;
