import React from "react";
import RatingCard from "../../ui/StarRatingCard";
import RatingProgressBar from "./RatingProgressBar";
import { useSelector } from "react-redux";

const CourseRating = () => {
  const { selectedCourse } = useSelector((state) => state.course);

  if (!selectedCourse) return null;

  const { courseRating, reviews } = selectedCourse;

  return (
    <div className="flex flex-col gap-5 w-full items-center">
      <div className="text-[#1d2026] font-inter text-2xl font-semibold leading-8 tracking-[-0.015rem] text-left w-[54.5rem]">
        Course Rating
      </div>
      <div className="flex flex-row items-center gap-6 w-full">
        <div className="flex py-[1.9375rem] flex-col justify-center items-center gap-3 border border-[#e9eaf0] bg-white">
          <div className="text-[#1d2026] text-center font-inter text-5xl font-semibold leading-[3.25rem] tracking-[-0.06rem]">
            {courseRating}
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <RatingCard rating={courseRating} size="1.25rem" />
            <div className="text-[#1d2026] text-center w-[12.5rem] font-inter text-sm font-medium leading-5 tracking-[-0.00875rem]">
              Course Rating
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-5 w-full">
          {[5, 4, 3, 2, 1].map((rating, index) => (
            <div key={index} className="w-full">
              <RatingProgressBar key={index} reviews={reviews} value={rating} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseRating;
