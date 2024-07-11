import PropTypes from "prop-types";
import React from "react";
import RatingCard from "../../ui/StarRatingCard";

const RatingProgressBar = ({ reviews, value }) => {
  const ratingQuantity = reviews.filter(
    (review) => review.rating === value
  ).length;
  const percentage = (ratingQuantity / reviews.length) * 100;

  return (
    <div className="flex flex-row gap-6 w-full">
      <div className="flex flex-row gap-1 w-full">
        <RatingCard rating={value} size="1.25rem" />
        <div className="text-[#6e7485] text-right font-inter text-sm font-normal leading-[1.375rem] tracking-[-0.00875rem]">
          {value}&nbsp;Star Rating
        </div>
      </div>
      <div className="flex items-center gap-4">
        <progress
          className="progress w-[23.5rem] [&::-webkit-progress-bar]:bg-[#FFF2E5] [&::-webkit-progress-value]:bg-[#FD8E1F] [&::-moz-progress-bar]:bg-[#FD8E1F]"
          value={percentage}
          max="100"
        ></progress>
        <div className="text-[#1d2026] text-right w-10 font-inter text-sm font-medium leading-5 tracking-[-0.00875rem]">
          {percentage >= 1 ? `${percentage.toFixed(0)}%` : "< 1%"}
        </div>
      </div>
    </div>
  );
};

RatingProgressBar.propTypes = {
  reviews: PropTypes.array.isRequired,
  value: PropTypes.number.isRequired,
};

export default RatingProgressBar;
