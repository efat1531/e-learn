import React from "react";
import YouTube from "react-youtube";
import PropTypes from "prop-types";

const VideoPlayer = ({ videoID, width, height }) => {
  const optObj = {
    height: height,
    width: width,
    playerVars: {
      autoplay: 0,
    },
  };

  videoID = videoID.split("v=")[1];

  const _onReady = (event) => {
    event.target.pauseVideo();
  };

  const _onError = (event) => {
    console.log("Error", event);
  };

  return (
    <YouTube
      videoId={videoID}
      opts={optObj}
      onReady={_onReady}
      onError={_onError}
    />
  );
};

VideoPlayer.propTypes = {
  videoID: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default VideoPlayer;
