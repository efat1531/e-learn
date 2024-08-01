/* eslint-disable react/prop-types */
import { IoIosMenu } from "react-icons/io";
import Button from "../../../../ui/Button";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import EditLectureNameModal from "./Modals/EditLectureNameModal";
import { useState } from "react";

const SectionLecture = ({ lecture, sectionIndex, lectureIndex, editLectureName, deleteLecture }) => {
  const [editLectureNameModalOpen, setEditLectureNameModalOpen] =
    useState(false);

  return (
    <div className="flex justify-between items-center bg-white p-4">
      <p className="flex items-center gap-2">
        <IoIosMenu className="text-xl" /> {lecture.lectureName}
      </p>
      <p className="flex items-center gap-3 text-xl">
        <span>
          <Button
            type="button"
            title="Contents"
            className="text-sm px-4 py-2"
          />
        </span>
        <span className="cursor-pointer" onClick={() => setEditLectureNameModalOpen(true)}>
          <FaRegEdit />
        </span>
        <span className="cursor-pointer">
          <FaRegTrashAlt className="text-Primary-500"  onClick={() => deleteLecture(sectionIndex, lectureIndex)} />
        </span>
      </p>
      {/* Modals */}
      {editLectureNameModalOpen && (
        <EditLectureNameModal
          setEditLectureNameModalOpen={setEditLectureNameModalOpen}
          name={lecture.lectureName}
          sectionIndex={sectionIndex}
          lectureIndex={lectureIndex}
          editLectureName={editLectureName}
        />
      )}
    </div>
  );
};
export default SectionLecture;
