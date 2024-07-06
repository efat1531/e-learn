import { useState } from "react";
import CustomSelect from "../../ui/CustomSelect";
import StudentFeedbackCard from "../../ui/Feedback";
import reviewData from "../../../../Data/reviewData.json";
import PropTypes from "prop-types";
import { ImSpinner6 } from "react-icons/im";

const options = [
  {
    value: "1",
    label: "1 Star Rating",
    hoverColor: "#FF0000", // Red for 1 star
    textColor: "#FFFFFF", // White text
  },
  {
    value: "2",
    label: "2 Star Rating",
    hoverColor: "#FF7F00", // Orange for 2 stars
    textColor: "#FFFFFF", // White text
  },
  {
    value: "3",
    label: "3 Star Rating",
    hoverColor: "#FFFF00", // Yellow for 3 stars
    textColor: "#000000", // Black text
  },
  {
    value: "4",
    label: "4 Star Rating",
    hoverColor: "#00FF00", // Green for 4 stars
    textColor: "#000000", // Black text
  },
  {
    value: "5",
    label: "5 Star Rating",
    hoverColor: "#0000FF", // Blue for 5 stars
    textColor: "#FFFFFF", // White text
  },
];

const StudentsRating = ({ courseID }) => {
  const reviews = reviewData.filter((review) => review.courseID === courseID);
  const [selectedOption, setSelectedOption] = useState(options[4]);
  const [visibleReviews, setVisibleReviews] = useState(2);

  const filteredAndSortedRatings = reviews
    .filter((rating) => rating.rating <= parseInt(selectedOption.value))
    .sort((a, b) => b.rating - a.rating);

  const length = filteredAndSortedRatings.length;

  const handleLoadMore = () => {
    setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 2);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setVisibleReviews(2);
  };

  return (
    <div className="flex flex-col items-start gap-5 w-full">
      <div className="flex w-full justify-between items-center">
        <div className="text-[#1d2026] text-1.5rem font-semibold leading-8 tracking-[-0.015rem]">
          Student&apos;s Feedback
        </div>
        {reviews.length > 0 && (
          <div className="filter">
            <CustomSelect
              options={options}
              setSelectedOption={handleOptionChange}
              selectedOption={selectedOption}
              customPlaceholder="Filter by Rating"
            />
          </div>
        )}
      </div>
      {filteredAndSortedRatings
        .slice(0, visibleReviews)
        .map((rating, index) => (
          <div key={index} className="flex flex-col items-start gap-5">
            <StudentFeedbackCard feedback={rating} />
          </div>
        ))}
      {visibleReviews < length && (
        <button
          className="flex px-6 justify-center items-center gap-3 outline-none border-none"
          onClick={handleLoadMore}
        >
          <div className="flex px-6 bg-Primary-100 justify-center items-center gap-3 group">
            <span className="text-Primary-500 font-inter text-base font-semibold leading-[3rem] tracking-tight capitalize">
              Load More
            </span>
            <ImSpinner6 className="text-Primary-500 animate-spi group-hover:animate-spin" />
          </div>
        </button>
      )}
    </div>
  );
};

StudentsRating.propTypes = {
  courseID: PropTypes.string.isRequired,
};

export default StudentsRating;
