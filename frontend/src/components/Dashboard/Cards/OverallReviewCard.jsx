import React from "react";
import RatingCard from "../../ui/StarRatingCard";
import RatingProgressBar from "./RatingProgressBar";
import { useSelector } from "react-redux";

const OverallReviewCard = () => {
  let selectedCourse = {
    courseRating: 4.5,
    reviews: [],
  };

  const { courseRating, reviews } = selectedCourse;

  return (
    <div className="flex gap-5 w-full items-center">
      <div className="flex flex-col items-center gap-6 w-full">
        <div className="border-b w-full p-8">
          <div className="flex py-[1.9375rem] flex-col max-w-[250px] mx-auto justify-center items-center gap-3 border border-[#e9eaf0]">
            <div className="text-[#1d2026] text-center font-inter text-5xl font-semibold leading-[3.25rem] tracking-[-0.06rem]">
              {courseRating}
            </div>
            <div className="flex flex-col justify-center items-center gap-3">
              <RatingCard rating={courseRating} size="1.25rem" />
              <div className="text-[#1d2026] text-center w-[12.5rem] font-inter text-sm font-medium leading-5 tracking-[-0.00875rem]">
                Overall Rating
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-5 w-full p-4">
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

export default OverallReviewCard;
