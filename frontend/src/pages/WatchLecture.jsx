import React, { useEffect } from "react";
import LectureContainer from "../components/WatchLecture/LectureContainer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCourseProgression } from "../features/courseSlice";
import { useFetchCourseProgressionQuery } from "../features/api/courseProgressionApiSlice";

function WatchLecture() {
  const { slug, lectureId } = useParams();
  

  const dispatch = useDispatch();
  const { data, error, isLoading } = useFetchCourseProgressionQuery(slug);
  const s = useSelector((state) => state.user);

  useEffect(() => {
    if (data) {
      dispatch(setCourseProgression(data.data));
    }
  }, [data, dispatch]);

  console.log(data);
  

  if (isLoading || error) return null;

  return <LectureContainer />;
}

export default WatchLecture;
