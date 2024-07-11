import BestSellingCourses from "../components/Home/BestSellingCourses";
import Hero from "../components/Home/Hero";
import Instructor from "../components/Home/Instructor";
import RecentlyAddedCourse from "../components/Home/RecentlyAddedCourse";

const Home = () => {
  return (
    <>
      <Hero />
      <BestSellingCourses />
      <RecentlyAddedCourse />
      <Instructor />
    </>
  );
};

export default Home;
