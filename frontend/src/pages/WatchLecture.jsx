import React, { useEffect } from "react";
import LectureContainer from "../components/WatchLecture/LectureContainer";
import { useParams } from "react-router-dom";
import { useFetchCourseQuery } from "../features/api/courseApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setSingleCourse } from "../features/courseSlice";

function WatchLecture() {
  const { slug, lectureId } = useParams();
  

  const dispatch = useDispatch();
  const { data, error, isLoading } = useFetchCourseQuery(slug);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (data) {
      dispatch(setSingleCourse(data.data));
    }
  }, [data, dispatch]);

  if (isLoading || error) return null;

  return <LectureContainer />;
}

export default WatchLecture;
