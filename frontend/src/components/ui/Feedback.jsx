import React, { useState } from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import StarRatingCard from "./StarRatingCard";
import { Pencil, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import EditReviewPopup from "../SingleCourse/CourseContainer/ReviewEdit";

const formatDate = (date) => {
  return formatDistanceToNow(new Date(date)) + " ago";
};

const defaultProfilePicture =
  "https://avatar.iran.liara.run/public/boy?username=Ash";

const StudentFeedbackCard = ({ feedback }) => {
  const { user, updatedAt, rating, comment } = feedback;
  const { id: currentUser } = useSelector((state) => state.auth);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  console.log(feedback);

  const handleEditReview = () => {
    setSelectedReview({
      _id: feedback._id,
      rating,
      feedback: comment,
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteReview = () => {
    console.log("Delete review");
  };

  const userProfilePicture = user.profilePicture ?? defaultProfilePicture;

  return (
    <>
      {isEditModalOpen && (
        <EditReviewPopup
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          initialReview={selectedReview}
        />
      )}
      <div className="flex justify-center items-start gap-4 w-full">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src={defaultProfilePicture} alt={user.name} />
          </div>
        </div>
        <div className="flex flex-col items-start gap-3 w-full">
          <div className="flex flex-col items-start gap-2 w-full">
            <div className="flex items-center justify-between w-full">
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
              <div className="flex items-center gap-2">
                {user._id === currentUser && (
                  <>
                    <button
                      className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded transition-colors"
                      onClick={handleEditReview}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-colors"
                      onClick={handleDeleteReview}
                    >
                      <Trash2 size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>
            <StarRatingCard rating={rating} size="1.25rem" gap="0rem" />
          </div>
          <div className="text-gray-700 w-full font-inter text-base font-normal leading-6 tracking-tight">
            {comment}
          </div>
        </div>
      </div>
    </>
  );
};

StudentFeedbackCard.propTypes = {
  feedback: PropTypes.shape({
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      profilePicture: PropTypes.string.isRequired,
    }).isRequired,
    updatedAt: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
  }).isRequired,
};

export default StudentFeedbackCard;
