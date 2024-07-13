import React from "react";
import VideoPlayer from "../../ui/VideoPlayer";

import { useSelector } from "react-redux";

const IntroVideo = () => {
  const { selectedCourse } = useSelector((state) => state.course);
  if (!selectedCourse) return null;
  const youtubeLink = selectedCourse.introVideo;
  return (
    <div>
      <div className="flex justify-center">
        <div className="hidden lg:flex">
          <VideoPlayer url={youtubeLink} width={872} height={490} />
        </div>
        <div className="lg:hidden">
          <VideoPlayer url={youtubeLink} width={640} height={360} />
        </div>
      </div>
    </div>
  );
};

export default IntroVideo;
