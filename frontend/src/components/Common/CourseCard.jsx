import react from "react";
import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa6";
import { numberToEnFormat } from "../../utils/Transformations";

const CourseCard = ({ course }) => {
  const { imageSrc, title, category, rating, price, discount, students } =
    course;
  return (
    <div className="inline-flex pb-[0.875rem] flex-col justify-center items-center gap-[0.88rem] bg-white">
      <div
        className="w-[15.25rem] h-[11.4375rem]"
        style={{
          boxShadow: "0px -1px 0px 0px #E9EAF0 inset",
          background: `url(${imageSrc}) lightgray 50% / cover no-repeat`,
        }}
      ></div>
      <div className="flex flex-col justify-center w-full items-center gap-[0.625rem]">
        <div className="flex px-[0.875rem] w-full justify-between items-center">
          <div
            className=" px-[0.375rem]"
            style={{ backgroundColor: category.backgroundColor }}
          >
            <span
              className="text-[0.60rem] font-[500] leading-[0.6rem] uppercase"
              style={{ color: category.color }}
            >
              {category.name}
            </span>
          </div>
          <div>
            {discount > 0 && (
              <span className="text-primary font-semibold text-sm">
                {price - discount}$&nbsp;
              </span>
            )}
            <span
              className={`text-primary-500 font-semibold text-xs ${
                discount > 0
                  ? "line-through text-gray-500 font-normal opacity-50 text-sm"
                  : ""
              }`}
            >
              {price === 0 ? "Free" : `${price}$`}
            </span>
          </div>
        </div>
        <div className="text-sm font-[500] max-w-[13.5rem] h-11 line-clamp-2">
          {title}
        </div>
      </div>
      <div className="divider h-[1px] m-0"></div>
      <div className="flex w-full px-[0.88rem] justify-between items-center">
        <div className="flex gap-[0.25rem]">
          <FaStar className="text-Warning-500 h-4 w-4" />
          <span className="text-sm font-[500] text-CustomGray-700">
            {rating}
          </span>
        </div>
        <div className="flex gap-1">
          <span className="text-sm font-[500] text-CustomGray-700">
            {numberToEnFormat(students)}
          </span>
          <span className="text-sm font-normal text-CustomGray-500">
            {students > 1 ? "Students" : "Student"}
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
