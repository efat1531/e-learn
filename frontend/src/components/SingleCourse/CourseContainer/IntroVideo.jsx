import React from "react";
import VideoPlayer from "../../ui/VideoPlayer";
import PropTypes from "prop-types";

const IntroVideo = ({ link }) => {
  return (
    <div>
      <div className="flex justify-center">
        <div className="hidden lg:flex">
          <VideoPlayer videoID={link} width={872} height={490} />
        </div>
        <div className="lg:hidden">
          <VideoPlayer videoID={link} width={640} height={360} />
        </div>
      </div>
    </div>
  );
};

IntroVideo.propTypes = {
  link: PropTypes.string.isRequired,
};

export default IntroVideo;
