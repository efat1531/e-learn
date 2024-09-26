import React, { useEffect, Suspense, lazy } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useFetchCourseQuery } from "../features/api/courseApiSlice";
import { setSingleCourse } from "../features/courseSlice";

// Lazy load components
const CourseTitle = lazy(() =>
  import("../components/SingleCourse/CourseContainer/CourseTitle")
);
const IntroVideo = lazy(() =>
  import("../components/SingleCourse/CourseContainer/IntroVideo")
);
const SideBar = lazy(() =>
  import("../components/SingleCourse/SideBar/SideBar")
);
const CourseDescription = lazy(() =>
  import("../components/SingleCourse/CourseContainer/CourseDescription")
);
const WhatYouWillLearn = lazy(() =>
  import("../components/SingleCourse/CourseContainer/WhatYouWillLearn")
);
const CourseRequirement = lazy(() =>
  import("../components/SingleCourse/CourseContainer/CourseRequirement")
);
const Curriculum = lazy(() =>
  import("../components/SingleCourse/CourseContainer/Curriculum")
);
const InstructorInfo = lazy(() =>
  import("../components/SingleCourse/CourseContainer/InstructorInfo")
);
const ReviewInput = lazy(() =>
  import("../components/SingleCourse/CourseContainer/ReviewInput")
);
const CourseRating = lazy(() =>
  import("../components/SingleCourse/CourseContainer/CourseRating")
);
const StudentsReview = lazy(() =>
  import("../components/SingleCourse/CourseContainer/StudentsReview")
);

const SingleCourse = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const selectedCourse = useSelector((state) => state.course.selectedCourse);
  const { courseList, id: userID } = useSelector((state) => state.auth);
  const needFetch = !selectedCourse || selectedCourse.slug !== slug;
  const { data, error, isLoading } = useFetchCourseQuery(slug, {
    skip: !needFetch,
  });

  useEffect(() => {
    if (data) {
      dispatch(setSingleCourse(data.data));
    }
  }, [data, dispatch]);

  if (isLoading || error || !selectedCourse) return null;

  const canReview = () => {
    if (!courseList.includes(selectedCourse._id)) return false;
    if (selectedCourse.reviews.length > 0) {
      const userReview = selectedCourse.reviews.find(
        (review) => review.user._id === userID
      );
      if (userReview) return false;
    }
    return true;
  };

  return (
    <div className="relative w-full">
      {/* Background */}
      <div className="hidden absolute w-full h-80 bg-CustomGray-50 -z-10 lg:block"></div>
      {/* Main Container */}
      <div className="w-full justify-center flex flex-col lg:flex-row gap-6 items-center lg:items-start py-20">
        {/* Course Details */}
        <div className="flex max-w-[54.5rem] flex-col gap-10">
          <Suspense fallback={<div>Loading Course Title...</div>}>
            <CourseTitle />
          </Suspense>
          <Suspense fallback={<div>Loading Intro Video...</div>}>
            <IntroVideo />
          </Suspense>
          <Suspense fallback={<div>Loading Course Description...</div>}>
            <CourseDescription />
          </Suspense>
          <Suspense fallback={<div>Loading What You Will Learn...</div>}>
            <WhatYouWillLearn />
          </Suspense>
          <Suspense fallback={<div>Loading Course Requirement...</div>}>
            <CourseRequirement />
          </Suspense>
          <Suspense fallback={<div>Loading Curriculum...</div>}>
            <Curriculum />
          </Suspense>
          <Suspense fallback={<div>Loading Instructor Info...</div>}>
            <InstructorInfo />
          </Suspense>
          {canReview() && (
            <Suspense fallback={<div>Loading Review Input...</div>}>
              <ReviewInput />
            </Suspense>
          )}
          <Suspense fallback={<div>Loading Course Rating...</div>}>
            <CourseRating />
          </Suspense>
          <Suspense fallback={<div>Loading Students Review...</div>}>
            <StudentsReview />
          </Suspense>
        </div>
        {/* Side Bar */}
        <Suspense fallback={<div>Loading Side Bar...</div>}>
          <SideBar />
        </Suspense>
      </div>
    </div>
  );
};

export default SingleCourse;
