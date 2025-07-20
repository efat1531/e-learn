import React, { useReducer, useEffect } from "react";
import { FaCircleXmark } from "react-icons/fa6";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import RatingInput from "../../ui/StarRatingInput";
import { useUpdateReviewMutation } from "../../../features/api/reviewAPISlice";
import { toastManager } from "../../ui/toastGeneral";

const reducer = (state, action) => {
  switch (action.type) {
    case "rating":
      return { ...state, rating: action.payload };
    case "feedback":
      return { ...state, feedback: action.payload };
    case "reset":
      return action.payload;
    default:
      throw new Error("Invalid action type");
  }
};

const ratingOutput = (rating) => {
  if (rating > 4) return "Excellent";
  else if (rating >= 3) return "Good";
  else if (rating >= 2) return "Average";
  else if (rating >= 1) return "Poor";
  else return "Add a rating";
};

const EditReviewPopup = ({ isOpen, onClose, initialReview }) => {
  const [state, dispatch] = useReducer(reducer, initialReview);
  const [updateReview] = useUpdateReviewMutation();


  useEffect(() => {
    dispatch({ type: "reset", payload: initialReview });
  }, [initialReview]);

  const handleSubmit = async () => {
    const toastID = toastManager.loading("Updating review...");
    try {
      await updateReview({
        reviewId: initialReview._id,
        rating: state.rating,
        comment: state.feedback,
      }).unwrap();
      toastManager.updateStatus(toastID, {
        type: "success",
        render: "Review updated successfully",
      });
      onClose();
    } catch (error) {
      const message = error?.data?.message || "Failed to update review";
      toastManager.updateStatus(toastID, {
        type: "error",
        render: message,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-[37.5rem] max-w-[90%]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Review</h2>
          <button onClick={onClose}>
            <FaCircleXmark className="text-[1.5rem] text-[#8C94A3] hover:text-[#FD8E1F] transition-colors duration-300" />
          </button>
        </div>
        
        <div className="flex flex-col items-center gap-3 mb-4">
          <div className="flex flex-row items-center">
            <div className="text-[#1d2026] text-center text-xl font-semibold leading-[1.625rem]">
              {state.rating}
            </div>
            <div className="text-[#8c94a3] text-lg leading-6 tracking-[-0.01688rem]">
              &nbsp;{ratingOutput(state.rating)}
            </div>
          </div>
          <RatingInput
            rating={state.rating}
            dispatch={dispatch}
            width="2.5rem"
          />
        </div>
        
        <div className="mb-4">
          <div className="text-[#1d2026] text-sm leading-[1.375rem] tracking-[-0.00875rem] mb-1">
            Feedback
          </div>
          <div className="w-full p-4 border border-[#e9eaf0] bg-white">
            <textarea
              className="w-full border-none bg-transparent outline-none text-[#191a1d] resize-none font-inter text-base leading-6 placeholder:text-gray-500 placeholder:text-[1rem] tracking-[-0.008rem]"
              placeholder="Write your review here..."
              maxLength={700}
              rows={5}
              value={state.feedback}
              onChange={(e) =>
                dispatch({ type: "feedback", payload: e.target.value })
              }
            />
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <button 
            className="px-6 py-2 text-[#1d2026] bg-[#f5f7fa] font-inter text-base font-semibold tracking-[-0.008rem] rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="flex px-6 py-2 justify-center items-center gap-3 bg-[#ff6636] hover:bg-[#e55c26] active:bg-[#cc4f16] transition-colors duration-300 rounded"
            onClick={handleSubmit}
          >
            <div className="text-white font-inter text-base font-semibold tracking-[-0.008rem]">
              Update
            </div>
            <PiPaperPlaneRightFill className="text-white text-[1.5rem]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditReviewPopup;