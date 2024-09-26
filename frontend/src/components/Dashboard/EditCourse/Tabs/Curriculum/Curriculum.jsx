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
        sectionTitle: "Section name",
        sectionContainer: [
          {
            contentTitle: "Lecture Name",
            contentURL: "",
            contentType: "",
            contentDuration: 0,
            contentDescription: "",
          },
        ],
      },
    ]);
  };

  const editSectionName = (index, value) => {
    const newSection = _.cloneDeep(curriculums);
    newSection[index].sectionTitle = value;

    setCurriculums(newSection);
  };

  const editLectureName = (sectionIndex, lectureIndex, value) => {
    const newSection = _.cloneDeep(curriculums);
    newSection[sectionIndex].sectionContainer[lectureIndex].contentTitle =
      value;

    setCurriculums(newSection);
  };

  const addSectionLecture = (index) => {
    const newSection = _.cloneDeep(curriculums);
    newSection[index].sectionContainer = [
      ...newSection[index].sectionContainer,
      {
        contentTitle: "Lecture Name",
        contentURL: "",
        contentType: "",
        contentDuration: 0,
        contentDescription: "",
      },
    ];

    setCurriculums(newSection);
  };

  const deleteSection = (index) => {
    let newSection = _.cloneDeep(curriculums);
    newSection = newSection.filter((n, ind) => ind != index);

    setCurriculums(newSection);
  };

  const deleteLecture = (sectionIndex, lectureIndex) => {
    let newSection = _.cloneDeep(curriculums);
    newSection[sectionIndex].sectionContainer = newSection[
      sectionIndex
    ].sectionContainer.filter((n, ind) => ind != lectureIndex);

    setCurriculums(newSection);
  };

  const addContentToLecture = (sectionIndex, lectureIndex, value) => {
    const newSection = _.cloneDeep(curriculums);
    newSection[sectionIndex].sectionContainer[lectureIndex] = {
      contentTitle:
        newSection[sectionIndex].sectionContainer[lectureIndex].contentTitle,
      ...value,
    };

    setCurriculums(newSection);
  };

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
            deleteSection={deleteSection}
            deleteLecture={deleteLecture}
            addContentToLecture={addContentToLecture}
            // addFileToLecture={addFileToLecture}
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
            onClick={() => setCurrentTab("publish")}
          />
        </div>
      </div>
    </>
  );
};
export default Curriculum;
