import { useCountDown } from "@raddix/use-count-down";
import React from "react";
import PropTypes from "prop-types";

const CountDownTimer = ({ endTime, onFinishFunction }) => {
  const interval = countInterval(endTime);
  const initialTime = countInitialTime(endTime);

  const [count] = useCountDown(initialTime, {
    autoStart: true,
    onFinished: onFinishFunction,
    interval: interval,
  });

  return <div>{stringMake(count)}</div>;
};

CountDownTimer.propTypes = {
  endTime: PropTypes.number.isRequired,
  onFinishFunction: PropTypes.func,
};

export default CountDownTimer;

const countInterval = (endTime) => {
  const countDownDate = endTime;
  const now = Date.now();
  const distance = countDownDate - now;
  const seconds = Math.floor(distance / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let interval = 1000;
  if (days > 0) {
    interval = 1000 * 60 * 60;
  } else if (hours > 0) {
    interval = 1000 * 60;
  } else if (minutes > 0) {
    interval = 1000;
  }

  return interval;
};

const countInitialTime = (endTime) => {
  const now = new Date().getTime();
  const distance = endTime - now;
  return distance;
};

const stringMake = (count) => {
  const days = Math.floor(count / (1000 * 60 * 60 * 24));
  const hours = Math.floor((count % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((count % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((count % (1000 * 60)) / 1000);

  if (days > 0) {
    return `${days > 1 ? `${days} days` : `${days} day`} ${
      hours > 1 ? `${hours} hours` : `${hours} hour`
    } left`;
  } else if (hours > 0) {
    return `${hours > 1 ? `${hours} hours` : `${hours} hour`} ${
      minutes > 1 ? `${minutes} minutes` : `${minutes} minute`
    } left`;
  } else {
    return `${minutes > 1 ? `${minutes} minutes` : `${minutes} minute`} ${
      seconds > 1 ? `${seconds} seconds` : `${seconds} second`
    } left`;
  }
};
