import CourseData from "../../../Data/courseData.json";
import CourseCard from "../Common/CourseCard";
import { Link } from "react-router-dom";

const top10Course = CourseData.sort((a, b) => b.rating - a.rating).slice(0, 8);

const BestSellingCourses = () => {
  return (
    <section id="best-selling-course" className="bg-gray-50 py-16">
      <div className="py-[5rem] flex flex-col gap-[2.5rem] justify-center items-center">
        <div className="text-[2.5rem] font-[600] leading[3rem] tracking-tight text-CustomGray-900">
          Best Selling Courses
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 desktop:grid-cols-4 gap-4">
          {top10Course.map((course, index) => (
            <Link to={`/courses/${course.slug}`} key={index}>
              <CourseCard key={index} course={course} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellingCourses;
