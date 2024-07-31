/* eslint-disable react/prop-types */
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { IoIosMenu, IoMdAdd } from "react-icons/io";
import Button from "../../../../ui/Button";
import SectionLecture from "./SectionLecture";

const CurriculumSection = ({
  data,
  index,
  addSectionLecture,
  editSectionName,
}) => {
//   console.log(data);
  return (
    <div className="bg-CustomGray-50 p-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="flex gap-1">
          <span className="font-bold flex gap-1 items-center">
            <IoIosMenu className="text-xl" /> Sections {index + 1} :
          </span>{" "}
          {data.sectionName}
        </p>
        <p className="flex gap-3 text-xl text-CustomGray-400">
          <span
            className="cursor-pointer"
            onClick={() => {
              addSectionLecture(index);
            }}
          >
            <IoMdAdd />
          </span>
          <span
            className="cursor-pointer"
            onClick={() => {
              editSectionName(index, "ABC");
            }}
          >
            <FaRegEdit />
          </span>
          <span className="cursor-pointer">
            <FaRegTrashAlt />
          </span>
        </p>
      </div>
      {/* Body */}
      <div className="mt-4">
        {data.lectures.map((lecture, ind) => (
          <SectionLecture key={ind} lecture={lecture} />
        ))}
      </div>
    </div>
  );
};
export default CurriculumSection;
