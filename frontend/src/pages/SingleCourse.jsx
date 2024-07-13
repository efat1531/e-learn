import react, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useFetchCourseQuery } from "../features/api/courseApiSlice";
import { setSingleCourse } from "../features/courseSlice";
import CourseTitle from "../components/SingleCourse/CourseContainer/CourseTitle";
import IntroVideo from "../components/SingleCourse/CourseContainer/IntroVideo";
import SideBar from "../components/SingleCourse/SideBar/SideBar";
import CourseDescription from "../components/SingleCourse/CourseContainer/CourseDescription";
import WhatYouWillLearn from "../components/SingleCourse/CourseContainer/WhatYouWillLearn";
import CourseRequirement from "../components/SingleCourse/CourseContainer/CourseRequirement";
import Curriculum from "../components/SingleCourse/CourseContainer/Curriculum";
import InstructorInfo from "../components/SingleCourse/CourseContainer/InstructorInfo";
import ReviewInput from "../components/SingleCourse/CourseContainer/ReviewInput";
import CourseRating from "../components/SingleCourse/CourseContainer/CourseRating";
import StudentsReview from "../components/SingleCourse/CourseContainer/StudentsReview";

const SingleCourse = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { data, error, isLoading } = useFetchCourseQuery(slug);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (data) {
      dispatch(setSingleCourse(data.data));
    }
  }, [data, dispatch]);

  if (isLoading || error) return null;

  const canReview = () => {
    return (
      user &&
      user.role === "student" &&
      user.isVerified &&
      user.courses.includes(data.data._id)
    );
  };

  return (
    <div className="relative w-full">
      {/* Background */}
      <div className="hidden absolute w-full h-80 bg-CustomGray-50 -z-10 lg:block"></div>
      {/* Main Container */}
      <div className="w-full justify-center flex flex-col lg:flex-row gap-6 items-center lg:items-start py-20">
        {/* Course Details */}
        <div className="flex max-w-[54.5rem] flex-col gap-10">
          <CourseTitle />
          <IntroVideo />
          <CourseDescription />
          <WhatYouWillLearn />
          <CourseRequirement />
          <Curriculum />
          <InstructorInfo />
          {canReview() && <ReviewInput />}
          <CourseRating />
          <StudentsReview />
        </div>
        {/* Side Bar */}
        <SideBar />
      </div>
    </div>
  );
};

export default SingleCourse;
