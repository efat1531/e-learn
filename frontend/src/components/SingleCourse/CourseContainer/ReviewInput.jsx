import React, { useState, useReducer } from "react";

import { FaChevronCircleDown } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import RatingInput from "../../ui/RatingInput";

const initials = {
  rating: 0,
  feedback: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "rating":
      return { ...state, rating: action.payload };
    case "feedback":
      return { ...state, feedback: action.payload };
    case "reset":
      return { ...initials };
    default:
      throw new Error("Invalid action type");
  }
};

const handleSubmitBtn = (state, dispatch) => {
  dispatch({ type: "reset" });
};

const ratingOutput = (rating) => {
  if (rating > 4) return "Excellent";
  else if (rating >= 3) return "Good";
  else if (rating >= 2) return "Average";
  else if (rating >= 1) return "Poor";
  else return "Add a rating";
};

const WriteReview = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [state, dispatch] = useReducer(reducer, initials);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-6 self-stretch pb-6 w-full">
      <div
        className="flex w-full p-4 justify-between items-center bg-white shadow-[inset_0_-1px_0_0_#e9eaf0] group cursor-pointer"
        onClick={toggleOpen}
      >
        <div>Write a Review</div>
        <div>
          {!isOpen && (
            <FaChevronCircleDown className="text-[1.5rem] text-[#8C94A3] group-hover:text-[#FD8E1F] transition-colors duration-300" />
          )}
          {isOpen && (
            <FaCircleXmark className="text-[1.5rem] text-[#8C94A3] group-hover:text-[#FD8E1F] transition-colors duration-300" />
          )}
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-col justify-center items-center gap-3">
          <div className="flex flex-row items-center">
            <div className="text-[#1d2026] text-center text-xl font-semibold leading-[1.625rem]">
              {state.rating}
            </div>
            <div className="text-[#8c94a3] text-lg leading-6 tracking-[-0.01688rem]">
              &nbsp;{ratingOutput(state.rating)}
            </div>
          </div>
          {/* <RatingInput rating={state.rating} dispatch={dispatch} /> */}
          <RatingInput
            rating={state.rating}
            dispatch={dispatch}
            width="2.5rem"
          />
        </div>
      )}
      {isOpen && (
        <div className="flex w-[70%] flex-col items-start gap-1.5">
          <div className="text-[#1d2026] text-sm leading-[1.375rem] tracking-[-0.00875rem]">
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
      )}
      {isOpen && (
        <div className="flex w-[37.5rem] justify-between items-center">
          <button className="px-6 py-0 text-[#1d2026] bg-[#f5f7fa] leading-[3rem] font-inter text-base font-semibold leading-12 tracking-[-0.008rem] capitalize">
            Cancel
          </button>
          <button
            className="flex px-6 py-0 justify-center items-center gap-3 bg-[#ff6636] hover:bg-[#e55c26] active:bg-[#cc4f16] transition-colors duration-300"
            onClick={() => handleSubmitBtn(state, dispatch)}
          >
            <div className="text-white font-inter text-base font-semibold leading-[3rem] tracking-[-0.008rem] capitalize">
              Submit
            </div>

            <PiPaperPlaneRightFill className="text-white text-[1.5rem]" />
          </button>
        </div>
      )}
    </div>
  );
};

export default WriteReview;
