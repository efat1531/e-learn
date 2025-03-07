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
  deleteSection,
  deleteLecture,
  addContentToLecture,
  // addFileToLecture
}) => {
  //   console.log(data);
  const [editSectionModalOpen, setEditSectionModalOpen] = useState(false);

  return (
    <div className="bg-CustomGray-50 p-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="flex gap-1">
          <span className="font-bold flex gap-1 items-center">
            <IoIosMenu className="text-xl" /> Section {index + 1} :
          </span>{" "}
          {data.sectionTitle}
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
          <span
            className="cursor-pointer"
            onClick={() => {
              deleteSection(index);
            }}
          >
            <FaRegTrashAlt />
          </span>
        </p>
      </div>
      {/* Body */}
      <div className="mt-4 space-y-4">
        {data.sectionContainer.map((lecture, ind) => (
          <SectionLecture
            key={ind}
            lecture={lecture}
            editLectureName={editLectureName}
            sectionIndex={index}
            lectureIndex={ind}
            deleteLecture={deleteLecture}
            addContentToLecture={addContentToLecture}
            // addFileToLecture={addFileToLecture}
          />
        ))}
      </div>
      {/* Modals */}
      {editSectionModalOpen && (
        <EditSectionNameModal
          setEditSectionModalOpen={setEditSectionModalOpen}
          editSectionName={editSectionName}
          name={data.sectionTitle}
          index={index}
        />
      )}
    </div>
  );
};
export default CurriculumSection;
