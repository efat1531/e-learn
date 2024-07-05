import React from "react";
import PropTypes from "prop-types";
import { TextToParagraphs } from "../../../utils/Transformations";

const CourseDescription = ({ desc }) => {
  const description = TextToParagraphs(desc);

  return (
    <div className="max-w-[54.5rem] w-full flex flex-col gap-6 items-start">
      <div className="text-CustomGray-900 font-inter text-[1.5rem] font-semibold leading-[2rem] -tracking-[0.015rem]">
        Description
      </div>
      <div className="text-CustomGray-700 font-inter text-[0.875rem] font-normal leading-[1.375rem] -tracking-[0.00875rem] text-justify">
        {description.map((para, index) => (
          <p key={index}>{para}</p>
        ))}
      </div>
    </div>
  );
};

CourseDescription.propTypes = {
  desc: PropTypes.string.isRequired,
};

export default CourseDescription;
