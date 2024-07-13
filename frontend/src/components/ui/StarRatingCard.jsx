import PropTypes from "prop-types";
import React from "react";

import { FaStar } from "react-icons/fa";
import { FaRegStar, FaRegStarHalfStroke } from "react-icons/fa6";
import { GoStarFill } from "react-icons/go";

const starRating = (rating, size, color) => {
  const stars = [];
  const floorRating = Math.floor(rating);
  const hasHalfStar = rating - floorRating >= 0.5;

  for (let i = 0; i < floorRating; i++) {
    stars.push(<FaStar size={size} color={color} />);
  }

  if (hasHalfStar) {
    stars.push(<FaRegStarHalfStroke size={size} color={color} />);
  }

  for (let i = stars.length; i < 5; i++) {
    stars.push(<FaRegStar size={size} color={color} />);
  }

  return stars;
};

const StarRatingCard = ({
  rating,
  size = "1.5rem",
  gap = "0rem",
  color = "#FD8E1F",
}) => {
  const stars = starRating(rating, size, color).map((star, index) =>
    React.cloneElement(star, { key: index })
  );
  return (
    <div className="flex" style={{ gap: `${gap}` }}>
      {stars}
    </div>
  );
};

StarRatingCard.propTypes = {
  rating: PropTypes.number.isRequired,
  size: PropTypes.string,
  gap: PropTypes.string,
  color: PropTypes.string,
};

export default StarRatingCard;
