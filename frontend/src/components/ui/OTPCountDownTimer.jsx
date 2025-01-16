import { useCountDown } from "@raddix/use-count-down";
import React from "react";
import PropTypes from "prop-types";

const OTPCountDownTimer = ({ duration, onFinishFunction }) => {
  const initialTime = duration * 1000; // Convert seconds to milliseconds

  const [count] = useCountDown(initialTime, {
    autoStart: true,
    onFinished: onFinishFunction,
    interval: 1000, // 1 second interval
  });

  return <div>{formatTime(count)}</div>;
};

OTPCountDownTimer.propTypes = {
  duration: PropTypes.number.isRequired, // Duration in seconds
  onFinishFunction: PropTypes.func,
};

export default OTPCountDownTimer;

const formatTime = (count) => {
  if (count <= 0) {
    return "Time's up!";
  }

  const minutes = Math.floor(count / (1000 * 60));
  const seconds = Math.floor((count % (1000 * 60)) / 1000);

  return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ${seconds} ${seconds === 1 ? 'second' : 'seconds'} left`;
};