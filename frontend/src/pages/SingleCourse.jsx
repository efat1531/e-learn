import react, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Courses from "../../Data/courseData.json";
import CourseTitle from "../components/SingleCourse/CourseContainer/CourseTitle";
import IntroVideo from "../components/SingleCourse/CourseContainer/IntroVideo";
import SideBar from "../components/SingleCourse/SideBar/SideBar";
import CourseDescription from "../components/SingleCourse/CourseContainer/CourseDescription";

const SingleCourse = () => {
  const courseSlug = useParams().slug;
  const course = Courses.find((course) => course.slug === courseSlug);
  return (
    <div className="relative w-full">
      {/* Background */}
      <div className="hidden absolute w-full h-80 bg-CustomGray-50 -z-10 lg:block"></div>
      {/* Main Container */}
      <div className="w-full justify-center flex flex-col lg:flex-row gap-6 items-center lg:items-start py-20">
        {/* Course Details */}
        <div className="flex max-w-[54.5rem] flex-col gap-10">
          <CourseTitle course={course} />
          <IntroVideo link={course.introVideo} />
          <CourseDescription desc={course.description} />
        </div>
        {/* Side Bar */}
        <SideBar course={course} />
      </div>
    </div>
  );
};

export default SingleCourse;
