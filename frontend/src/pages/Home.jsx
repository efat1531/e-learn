import React, { Suspense, lazy } from "react";

// Lazy load components
const BestSellingCourses = lazy(() =>
  import("../components/Home/BestSellingCourses")
);
const Hero = lazy(() => import("../components/Home/Hero"));
const Instructor = lazy(() => import("../components/Home/Instructor"));
const RecentlyAddedCourse = lazy(() =>
  import("../components/Home/RecentlyAddedCourse")
);

const Home = () => {
  return (
    <>
      <Suspense fallback={<div>Loading Hero...</div>}>
        <Hero />
      </Suspense>
      <Suspense fallback={<div>Loading Best Selling Courses...</div>}>
        <BestSellingCourses />
      </Suspense>
      <Suspense fallback={<div>Loading Recently Added Course...</div>}>
        <RecentlyAddedCourse />
      </Suspense>
      <Suspense fallback={<div>Loading Instructor...</div>}>
        <Instructor />
      </Suspense>
    </>
  );
};

export default Home;
