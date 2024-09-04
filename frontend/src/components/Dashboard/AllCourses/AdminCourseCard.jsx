import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa6";
import { numberToEnFormat } from "../../../utils/Transformations";
import { GoKebabHorizontal } from "react-icons/go";
import { useState } from "react";
import { Link } from "react-router-dom";

const imageSrc =
  "https://www.pcinvasion.com/wp-content/uploads/2021/09/Lost-in-Random-Bloobs-5.jpg?fit=1200%2C675";

const category = {
  name: "Development",
  backgroundColor: "#F0F4FF",
  color: "#334155",
};

const AdminCourseCard = ({ course }) => {
  const [popupOpen, setPopupOpen] = useState(false);

  const { title, courseRating, price, courseStudents, currentPrice } = course;

  return (
    <div className="flex pb-[0.875rem] flex-col justify-center items-center gap-[0.88rem] bg-white max-w-[15.25rem] border-gray-100 border drop-shadow-lg hover:scale-105">
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
              className="text-[0.60rem] font-[500] leading-[0.6rem] uppercase text-left"
              style={{ color: category.color }}
            >
              {category.name}
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
      <div className="divider h-[1px] m-0"></div>
      <div className="flex w-full px-[0.88rem] justify-between items-center ">
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
            {currentPrice === 0 ? "Free" : `${currentPrice}$`}
          </span>
        </div>
        <div className="relative">
          <span
            onClick={() => {
              setPopupOpen((prev) => !prev);
            }}
          >
            <GoKebabHorizontal className="text-2xl cursor-pointer" />
          </span>
          {popupOpen && (
            <div className="bg-white shadow absolute -top-36 right-0 border-2 py-2 w-60">
              <ul>
                <li>
                  <Link to={`/courses/${course.slug}`} className="block px-4 py-2 hover:bg-Primary-500 hover:text-white">View Details</Link>
                </li>
                <li>
                  <Link to="" className="block px-4 py-2 hover:bg-Primary-500 hover:text-white">Edit Course</Link>
                </li>
                <li>
                  <Link to="" className="block px-4 py-2 hover:bg-Primary-500 hover:text-white">Delete Course</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

AdminCourseCard.propTypes = {
  course: PropTypes.object.isRequired,
};

export default AdminCourseCard;
