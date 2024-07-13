import React from "react";
import PropTypes from "prop-types";
import PriceCard from "./PriceCard";
import FeatureLabel from "./FeatureLabel";
import { LuClock } from "react-icons/lu";
import { FaRegChartBar, FaRegCopy } from "react-icons/fa";
import { GoPeople } from "react-icons/go";
import { GrResources } from "react-icons/gr";
import { FaLanguage } from "react-icons/fa6";
import {
  MdOutlineLockClock,
  MdMonitor,
  MdOutlineSubtitles,
  MdOnlinePrediction,
} from "react-icons/md";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";
import { toastManager } from "../../ui/toastGeneral";

const SideBar = () => {
  const { selectedCourse } = useSelector((state) => state.course);
  if (!selectedCourse) return null;
  const {
    price,
    discount,
    discountExpires,
    duration = 0,
    level,
    language,
    courseStudents,
  } = selectedCourse;

  const location = window.location.href;
  const onCopyClick = () => {
    navigator.clipboard.writeText(location);
    toastManager.success("Course link copied to clipboard.");
  };

  return (
    <div className="flex flex-col py-6 gap-6 justify-center items-center bg-white border border-gray-100 shadow-md">
      {/* Price Card */}
      <div className="px-6">
        <PriceCard
          price={price}
          discount={discount}
          endTime={discountExpires}
        />
      </div>
      <div className="w-full h-px bg-gray-200"></div>
      {/* Feature Section */}
      <div className="flex flex-col gap-4 w-full px-6">
        <FeatureLabel feature={{ title: "Duration", value: duration }}>
          <LuClock className="text-CustomGray-400 text-[1.4rem]" />
        </FeatureLabel>
        <FeatureLabel feature={{ title: "Level", value: level }}>
          <FaRegChartBar className="text-CustomGray-400 text-[1.4rem]" />
        </FeatureLabel>
        <FeatureLabel feature={{ title: "Students", value: courseStudents }}>
          <GoPeople className="text-CustomGray-400 text-[1.4rem]" />
        </FeatureLabel>
        <FeatureLabel feature={{ title: "Language", value: language }}>
          <FaLanguage className="text-CustomGray-400 text-[1.4rem]" />
        </FeatureLabel>
      </div>
      <div className="w-full h-px bg-gray-200"></div>
      {/* Button Section */}
      <div className="flex flex-col gap-3 w-full px-6">
        <Button title="Enroll Now" className="w-full" />
        <Button title="Add to cart" className="w-full" />
        <Button title="Add to wishlist" className="w-full" />
      </div>
      <div className="w-full h-px bg-gray-200"></div>
      {/* Include Section */}
      <div className="flex w-full flex-col justify-start items-center px-6 gap-4">
        <div className="w-full text-[1rem] font-[500] leading-[1.375rem] text-CustomGray-900">
          This Course include:
        </div>
        <div className="flex flex-col gap-3 w-full">
          <div className="flex gap-3 items-center w-full">
            <MdOutlineLockClock className="text-Primary-500 text-[1.4rem]" />
            <div className="text-[1rem] font-[400] leading-[1.375rem] text-CustomGray-700">
              Lifetime access
            </div>
          </div>
          <div className="flex gap-3 items-center w-full">
            <GrResources className="text-Primary-500 text-[1.4rem]" />
            <div className="text-[1rem] font-[400] leading-[1.375rem] text-CustomGray-700">
              Free resources and updates
            </div>
          </div>
          <div className="flex gap-3 items-center w-full">
            <MdMonitor className="text-Primary-500 text-[1.4rem]" />
            <div className="text-[1rem] font-[400] leading-[1.375rem] text-CustomGray-700">
              Accessible on mobile and TV
            </div>
          </div>
          <div className="flex gap-3 items-center w-full">
            <MdOutlineSubtitles className="text-Primary-500 text-[1.4rem]" />
            <div className="text-[1rem] font-[400] leading-[1.375rem] text-CustomGray-700">
              English Subtitles included
            </div>
          </div>
          <div className="flex gap-3 items-center w-full">
            <MdOnlinePrediction className="text-Primary-500 text-[1.4rem]" />
            <div className="text-[1rem] font-[400] leading-[1.375rem] text-CustomGray-700">
              100% Online and self-paced
            </div>
          </div>
        </div>
        <div className="w-full h-px bg-gray-200"></div>
        {/* Copy url Button */}
        <div className="flex flex-col px-6 w-full gap-4">
          <div className="text-[1rem] font-[500] leading-[1.375rem]">
            Share this course:
          </div>
          <div className="flex gap-3 w-full group" onClick={onCopyClick}>
            <FaRegCopy className="text-gray-600 text-[1.4rem] group-hover:text-Primary-500 group-hover:cursor-pointer" />
            <div className="text-sm text-gray-700 font-[500] group-hover:text-Primary-500 group-hover:cursor-pointer">
              Copy course link
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
