import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import StarRatingCard from "./StarRatingCard";
import React from "react";

const formatDate = (date) => {
  return formatDistanceToNow(new Date(date)) + " ago";
};

const StudentFeedbackCard = ({ feedback }) => {
  const { user, updatedAt, rating, comment } = feedback;

  return (
    <div className="flex justify-center items-start gap-4">
      <div className="avatar">
        <div className="w-10 rounded-full">
          <img src={user.profilePicture} />
        </div>
      </div>
      <div className="flex flex-col items-start gap-3">
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <div className="text-gray-900 text-right font-inter font-medium text-base leading-5 tracking-tight">
              {user.name}
            </div>
            <div className="text-gray-600 text-right font-inter text-xs font-normal leading-4">
              •
            </div>
            <div className="text-gray-600 text-right font-inter text-xs font-normal leading-4">
              {formatDate(updatedAt)}
            </div>
          </div>
          <StarRatingCard rating={rating} size="1.25rem" gap="0rem" />
        </div>
        <div className="text-gray-700 w-full font-inter text-base font-normal leading-6 tracking-tight">
          {comment}
        </div>
      </div>
    </div>
  );
};

StudentFeedbackCard.propTypes = {
  feedback: PropTypes.object.isRequired,
};

export default StudentFeedbackCard;
