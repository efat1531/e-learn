import React from "react";
import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa6";
import { numberToEnFormat } from "../../utils/Transformations";
import { useSelector } from "react-redux";
import { CURRENCY_SYMBOL } from "../../utils/Static_Currency_Variables";

const category = {
  name: "Development",
  backgroundColor: "#F0F4FF",
  color: "#334155",
};

const CourseCard = ({ course }) => {
  const { currency } = useSelector((state) => state.auth);
  const currencySymbol = CURRENCY_SYMBOL(currency);

  const {
    title,
    titleImage,
    courseRating,
    price,
    courseStudents,
    currentPrice,
  } = course;

  return (
    <div className="inline-flex pb-[0.875rem] flex-col justify-center items-center gap-[0.88rem] bg-white max-w-[15.25rem] border-gray-100 border drop-shadow-lg hover:scale-105">
      <div
        className="w-[15.25rem] h-[11.4375rem]"
        style={{
          boxShadow: "0px -1px 0px 0px #E9EAF0 inset",
          background: `url(${titleImage}) lightgray 50% / cover no-repeat`,
        }}
      ></div>
      <div className="flex flex-col justify-center w-full items-center gap-[0.625rem]">
        <div className="flex px-[0.875rem] w-full justify-between items-center">
          <div
            className=" px-[0.375rem]"
            style={{ backgroundColor: category.backgroundColor }}
          >
            <span
              className="text-[0.60rem] font-[500] leading-[0.6rem] uppercase text-left"
              style={{ color: category.color }}
            >
              {category.name}
            </span>
          </div>
          <div>
            {price != currentPrice && (
              <span className="text-primary font-semibold text-sm">
                {currentPrice}$&nbsp;
              </span>
            )}
            <span
              className={`text-primary-500 font-semibold text-xs ${
                price != currentPrice
                  ? "line-through text-gray-500 font-normal opacity-50 text-sm"
                  : ""
              }`}
            >
              {currentPrice === 0
                ? "Free"
                : `${currentPrice} ${currencySymbol}`}
            </span>
          </div>
        </div>
        <div className="text-sm font-[500] w-[13.5rem] h-11 line-clamp-2">
          {title}
        </div>
      </div>
      <div className="divider h-[1px] m-0"></div>
      <div className="flex w-full px-[0.88rem] justify-between items-center">
        <div className="flex gap-[0.25rem]">
          <FaStar className="text-Warning-500 h-4 w-4" />
          <span className="text-sm font-[500] text-CustomGray-700">
            {courseRating}
          </span>
        </div>
        <div className="flex gap-1">
          <span className="text-sm font-[500] text-CustomGray-700">
            {numberToEnFormat(courseStudents)}
          </span>
          <span className="text-sm font-normal text-CustomGray-500">
            {courseStudents > 1 ? "Students" : "Student"}
          </span>
        </div>
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
};

export default CourseCard;
