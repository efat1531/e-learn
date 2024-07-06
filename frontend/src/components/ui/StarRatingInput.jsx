import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import React from "react";
import { GoStarFill, GoStar } from "react-icons/go";

const handleClick = (rating, dispatch) => {
  dispatch({ type: "rating", payload: rating });
};

const RatingInput = ({ rating, dispatch, width = "1.25rem" }) => {
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    setHoverRating(0);
  }, [rating]);

  return (
    <div className="flex flex-row justify-center items-center gap-1">
      {[...Array(5)].map((star, index) => {
        return (
          <div
            key={index}
            onMouseEnter={() => setHoverRating(index + 1)}
            onMouseLeave={() => setHoverRating(rating)}
            onClick={() => handleClick(index + 1, dispatch)}
          >
            {index + 1 <= (hoverRating || rating) ? (
              <GoStarFill
                className="text-[#FD8E1F] transition-colors duration-300"
                size={width}
              />
            ) : (
              <GoStar
                className="text-CustomGray-200 transition-colors duration-300"
                size={width}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

RatingInput.propTypes = {
  rating: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  width: PropTypes.string,
};

export default RatingInput;
