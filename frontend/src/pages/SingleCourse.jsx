import react, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Courses from "../../Data/courseData.json";

const SingleCourse = () => {
  const courseSlug = useParams().slug;
  const [course, setCourse] = useState(null);

  useEffect(() => {
    if (!courseSlug) return;
    const course = Courses.find((course) => course.slug === courseSlug);
    setCourse(course);
  }, [courseSlug]);

  return null;
};

export default SingleCourse;
