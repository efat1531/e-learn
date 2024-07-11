import React from "react";
import PropTypes from "prop-types";

const FeatureLabel = ({ feature, children }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-1 items-center">
        {children}
        <div className="text-CustomGray-900 text-[0.93rem] leading-[1.375rem] tracking-[-0.00875rem]">
          {feature.title}
        </div>
      </div>
      <div className="text-gray-600 text-base font-normal leading-[1.375rem] tracking-tighter">
        {feature.value}
      </div>
    </div>
  );
};

FeatureLabel.propTypes = {
  feature: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default FeatureLabel;
