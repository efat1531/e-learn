import PropTypes from "prop-types";
import React from "react";
import { FaStarHalfAlt, FaStar } from "react-icons/fa";
import { FaStar as FaStarFull } from "react-icons/fa6";

const starRating = (rating, size, color) => {
  const stars = [];
  const floorRating = Math.floor(rating);
  const hasHalfStar = rating - floorRating >= 0.5;

  for (let i = 0; i < floorRating; i++) {
    stars.push(<FaStarFull size={size} color={color} />);
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt size={size} color={color} />);
  }

  for (let i = stars.length; i < 5; i++) {
    stars.push(<FaStar size={size} color={color} />);
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
