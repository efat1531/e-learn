/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import Button from "../../../../ui/Button";
import Input from "../../../../ui/Input";
import Select from "../../../../ui/Select";
import TextArea from "../../../../ui/TextArea";
import { X } from "lucide-react";
import { IoIosMenu, IoMdAdd } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import CurriculumSection from "./CurriculumSection";
import _ from "lodash";

const Curriculum = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setCurrentTab,
  curriculums,
  setCurriculums,
}) => {
  const addSection = () => {
    setCurriculums((prev) => [
      ...prev,
      {
        sectionName: "Section name",
        lectures: [{ lectureName: "Lecture Name" }],
      },
    ]);
  };

  const editSectionName = (index, value) => {
    const newSection = _.cloneDeep(curriculums);
    newSection[index].sectionName = value;

    setCurriculums(newSection);
  };

  const editLectureName = (sectionIndex, lectureIndex, value) => {
    const newSection = _.cloneDeep(curriculums);
    newSection[sectionIndex].lectures[lectureIndex].lectureName = value; 

    setCurriculums(newSection);
  };

  const addSectionLecture = (index) => {
    const newSection = _.cloneDeep(curriculums);
    newSection[index].lectures = [
      ...newSection[index].lectures,
      { lectureName: "Lecture Name" },
    ];

    setCurriculums(newSection);
  };

  const deleteSection = () => {};

  return (
    <>
      <div className="p-8 border-b">
        <h3>Course Curriculum</h3>
      </div>
      {/* Form Content */}
      <div className="p-8 space-y-4">
        {curriculums.map((c, ind) => (
          <CurriculumSection
            key={ind}
            data={c}
            index={ind}
            addSectionLecture={addSectionLecture}
            editSectionName={editSectionName}
            editLectureName={editLectureName}
          />
        ))}
        {/* Add More Button */}
        <div className="w-full mt-4">
          <Button
            title="Add Sections"
            className="w-full"
            type="button"
            onClick={addSection}
          />
        </div>
      </div>
      {/* Button */}
      <div className="px-8 pb-8 border-b">
        <div className="mt-4 flex justify-between">
          <Button
            title="Previous"
            className="bg-transparent text-black border hover:bg-CustomGray-50 hover:text-black"
            secondary
            type="button"
            onClick={() => setCurrentTab("advance")}
          />
          <Button
            title="Save & Next"
            secondary
            type="button"
            onClick={() => setCurrentTab("curriculum")}
          />
        </div>
      </div>
    </>
  );
};
export default Curriculum;
