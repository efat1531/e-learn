import React from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player/lazy";

// Render a YouTube video player

const VideoPlayer = ({ url, width, height }) => {
  return (
    <ReactPlayer url={url} width={width} height={height} controls={true} />
  );
};

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default VideoPlayer;
