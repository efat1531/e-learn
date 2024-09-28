/* eslint-disable react/prop-types */
import { IoIosMenu } from "react-icons/io";
import Button from "../../../../ui/Button";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import EditLectureNameModal from "./Modals/EditLectureNameModal";
import { useState } from "react";
import AddVideoModal from "./Modals/AddVideoModal";
import AddFileModal from "./Modals/AddFileModal";
import AddDocumentModal from "./Modals/AddDocumentModal";

const SectionLecture = ({
  lecture,
  sectionIndex,
  lectureIndex,
  editLectureName,
  deleteLecture,
  addContentToLecture,
  // addFileToLecture,
}) => {
  const [editLectureNameModalOpen, setEditLectureNameModalOpen] =
    useState(false);

  const [addContentModalOpen, setAddContentModalOpen] = useState(false);

  const [addVideoModal, setAddVideoModal] = useState(false);

  const [addDocumentModal, setAddDocumentModal] = useState(false);

  return (
    <div className="flex justify-between items-center bg-white p-4">
      <div className="flex items-center gap-2">
        <IoIosMenu className="text-xl" /> {lecture.contentTitle}
        {lecture.contentType == "video" && (
          <span className="px-3 py-1 bg-green-200 rounded-full text-sm">
            {" "}
            Video
          </span>
        )}
        {lecture.contentType == "document" && (
          <span className="px-3 py-1 bg-green-200 rounded-full text-sm">
            {" "}
            Document
          </span>
        )}
      </div>
      <div className="flex items-center gap-3 text-xl">
        <div className="relative">
          <Button
            type="button"
            title="Contents"
            className="text-sm px-4 py-2"
            onClick={() => setAddContentModalOpen((prev) => !prev)}
          />
          {/* Modal */}
          {addContentModalOpen && (
            <div className="absolute bg-white border right-0 mt-2 w-40 z-20">
              <div className="grid gap-2 text-sm">
                <p
                  className={`px-4 py-2 hover:bg-CustomGray-50 cursor-pointer ${
                    lecture.contentType == "document" &&
                    "bg-CustomGray-200 hover:bg-CustomGray-200"
                  }`}
                  onClick={() =>
                    lecture.contentType != "document" && setAddVideoModal(true)
                  }
                >
                  Video
                </p>
                <p
                  className={`px-4 py-2 hover:bg-CustomGray-50 cursor-pointer ${
                    lecture.contentType == "video" &&
                    "bg-CustomGray-200 hover:bg-CustomGray-200"
                  }`}
                  onClick={() =>
                    lecture.contentType != "video" && setAddDocumentModal(true)
                  }
                >
                  Document
                </p>
              </div>
            </div>
          )}
        </div>
        <span
          className="cursor-pointer"
          onClick={() => setEditLectureNameModalOpen(true)}
        >
          <FaRegEdit />
        </span>
        <span className="cursor-pointer">
          <FaRegTrashAlt
            className="text-Primary-500"
            onClick={() => deleteLecture(sectionIndex, lectureIndex)}
          />
        </span>
      </div>
      {/* Modals */}
      {editLectureNameModalOpen && (
        <EditLectureNameModal
          setEditLectureNameModalOpen={setEditLectureNameModalOpen}
          name={lecture.contentTitle}
          sectionIndex={sectionIndex}
          lectureIndex={lectureIndex}
          editLectureName={editLectureName}
        />
      )}
      {addVideoModal && (
        <AddVideoModal
          content={lecture}
          setAddVideoModal={setAddVideoModal}
          sectionIndex={sectionIndex}
          lectureIndex={lectureIndex}
          addContentToLecture={addContentToLecture}
        />
      )}
      {addDocumentModal && (
        <AddDocumentModal
          content={lecture}
          setAddDocumentModal={setAddDocumentModal}
          sectionIndex={sectionIndex}
          lectureIndex={lectureIndex}
          addContentToLecture={addContentToLecture}
        />
      )}
    </div>
  );
};
export default SectionLecture;
