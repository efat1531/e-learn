import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useFetchTopCourseQuery } from "../../features/api/courseApiSlice";
import { setTopCourses } from "../../features/courseSlice";
import CourseCard from "../Common/CourseCard";

const BestSellingCourses = () => {
  const dispatch = useDispatch();
  const {topCourses} = useSelector((state) => state.course);
  const { data: fetchTopCourses } = useFetchTopCourseQuery(  {skip: !topCourses} );

  useEffect(() => {
    if (fetchTopCourses) {
      
      dispatch(setTopCourses(fetchTopCourses.data));
    }
  }, [fetchTopCourses, dispatch]);


  return (
    <section id="best-selling-course" className="bg-gray-50 py-16">
      <div className="py-[5rem] flex flex-col gap-[2.5rem] justify-center items-center">
        <div className="text-[2.5rem] font-[600] leading[3rem] tracking-tight text-CustomGray-900">
          Best Selling Courses
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 desktop:grid-cols-4 gap-4">
          {topCourses.map((course, index) => (
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
