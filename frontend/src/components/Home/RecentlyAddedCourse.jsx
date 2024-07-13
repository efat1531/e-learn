import CourseData from "../../../Data/courseData.json";
import CourseCard from "../Common/CourseCard";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { useSelector } from "react-redux";
import react, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFetchRecentCourseQuery } from "../../features/api/courseApiSlice";
import { setNewCourses } from "../../features/courseSlice";

const recentlyAdded = CourseData.sort((a, b) => b.createAt - a.createAt).slice(
  0,
  4
);

const RecentlyAddedCourse = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useFetchRecentCourseQuery();

  useEffect(() => {
    if (data) {
      dispatch(setNewCourses(data.data));
    }
  }, [data, dispatch]);
  const { newCourses } = useSelector((state) => state.course);

  if (isLoading) {
    return <div className="cursor-progress">Loading...</div>;
  }

  return (
    <section id="best-selling-course" className="bg-fff py-16">
      <div className="py-[5rem] flex flex-col gap-[2.5rem] justify-center items-center">
        <div className="text-[2.5rem] font-[600] leading[3rem] tracking-tight text-CustomGray-900">
          Recently Added Course
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 desktop:grid-cols-4 gap-4">
          {newCourses.map((course, index) => (
            <Link to={`/courses/${course.slug}`} key={index}>
              <CourseCard key={index} course={course} />
            </Link>
          ))}
        </div>
        <Link to="/courses" className="group">
          <Button title="View All Courses" />
        </Link>
      </div>
    </section>
  );
};

export default RecentlyAddedCourse;
