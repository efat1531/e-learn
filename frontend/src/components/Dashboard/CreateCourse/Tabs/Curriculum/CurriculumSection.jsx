/* eslint-disable react/prop-types */
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { IoIosMenu, IoMdAdd } from "react-icons/io";
import Button from "../../../../ui/Button";
import SectionLecture from "./SectionLecture";
import { useState } from "react";
import EditSectionNameModal from "./Modals/EditSectionNameModal";

const CurriculumSection = ({
  data,
  index,
  addSectionLecture,
  editSectionName,
  editLectureName,
}) => {
  //   console.log(data);
  const [editSectionModalOpen, setEditSectionModalOpen] = useState(false);

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
              setEditSectionModalOpen(true);
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
      <div className="mt-4 space-y-4">
        {data.lectures.map((lecture, ind) => (
          <SectionLecture
            key={ind}
            lecture={lecture}
            editLectureName={editLectureName}
            sectionIndex={index}
            lectureIndex={ind}
          />
        ))}
      </div>
      {/* Modals */}
      {editSectionModalOpen && (
        <EditSectionNameModal
          setEditSectionModalOpen={setEditSectionModalOpen}
          editSectionName={editSectionName}
          name={data.sectionName}
          index={index}
        />
      )}
    </div>
  );
};
export default CurriculumSection;
