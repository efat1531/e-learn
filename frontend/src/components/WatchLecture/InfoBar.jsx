import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useParams } from "react-router-dom";
import CourseData from "../../../Data/courseData.json";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { durationConversion } from "../../utils/Transformations";

function InfoBar() {
  const { slug, lectureId } = useParams();

  const navigate = useNavigate();
  const goBackFunction = () => {
    navigate(-1);
  };

  //  --------------------------
  const { selectedCourse } = useSelector((state) => state.course);
  if (!selectedCourse) return null;
  const { courseContent, title } = selectedCourse;

  let currentLecture = {};
  courseContent.filter((content) =>
    content.sectionContainer.map((lecture) => {
      if (lecture._id === lectureId) {
        currentLecture = lecture;
      }
    })
  );

  return (
    <div className="w-full px-8 py-5 bg-gray-50 flex justify-between">
      <div className="flex gap-5 items-center">
        <div
          className="p-4 bg-white rounded-full hover:cursor-pointer"
          onClick={goBackFunction}
        >
          <IoMdArrowRoundBack className="text-[1.25rem] text-CustomGray-900" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-CustomGray-900  font-[500] text-[1.25] leading-6">
            {title}
          </div>
          <div className="text-CustomGray-600 font-inter font-normal text-sm">
            {currentLecture.contentTitle}
          </div>
        </div>
      </div>
      <div className=""></div>
    </div>
  );
}

export default InfoBar;
