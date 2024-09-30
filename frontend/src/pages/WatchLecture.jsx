import React, { useEffect } from "react";
import LectureContainer from "../components/WatchLecture/LectureContainer";
import { useParams } from "react-router-dom";
import { useFetchCourseQuery } from "../features/api/courseApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setSingleCourse } from "../features/courseSlice";
import { useFetchCourseProgressionQuery } from "../features/api/courseProgressionApiSlice";

function WatchLecture() {
  const { slug, lectureId } = useParams();

  const dispatch = useDispatch();
  // const { data, error, isLoading } = useFetchCourseQuery(slug);
  const { data, error, isLoading } = useFetchCourseProgressionQuery(slug);
  const { auth } = useSelector((state) => state);

  console.log(data);

  useEffect(() => {
    if (data) {
      dispatch(setSingleCourse(data.data));
    }
  }, [data, dispatch]);

  if (isLoading || error) return null;

  // return <>hi</>;
  return <LectureContainer />;
}

export default WatchLecture;
