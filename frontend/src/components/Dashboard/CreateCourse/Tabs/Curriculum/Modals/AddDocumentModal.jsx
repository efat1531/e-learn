/* eslint-disable react/prop-types */
import { X } from "lucide-react";
import Button from "../../../../../ui/Button";
import Input from "../../../../../ui/Input";
import { useState } from "react";
import TextArea from "../../../../../ui/TextArea";

const AddDocumentModal = ({
  content,
  setAddDocumentModal,
  sectionIndex,
  lectureIndex,
  addContentToLecture,
}) => {
  const [contentURL, setContentURL] = useState(content.contentURL);
  const [contentDescription, setContentDescription] = useState(content.contentDescription);

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modalContainer")) {
      setAddDocumentModal(false);
    }
  };

  const handleSubmit = () => {
    // console.log(videoURL);
    addContentToLecture(sectionIndex, lectureIndex, {
      contentType: 'document',
      contentURL: contentURL,
      contentDuration: 0,
      contentDescription: contentDescription
    });
    setAddDocumentModal(false);
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black/80 z-20 modalContainer"
      onClick={handleOutsideClick}
    >
      <div className="max-w-[768px] mx-auto mt-40 bg-white">
        <div className="border-b p-4 flex justify-between">
          <h5>Add Document</h5>
          <span
            className="text-CustomGray-400 cursor-pointer"
            onClick={() => setAddDocumentModal(false)}
          >
            <X />
          </span>
        </div>
        {/* Body */}
        <div className="p-4">
          <div className="row">
            <Input
              id="videoURL"
              label="Document URL"
              placeholder="Enter your document url here..."
              required
              type="url"
              value={contentURL}
              onChange={(e) => setContentURL(e.target.value)}
            />    
          </div>
          <div className="row mt-4">
            <TextArea
              id="contentDescription"
              label="Document Description"
              placeholder="Enter your document description here..."
              required
              type="text"
              value={contentDescription}
              onChange={(e) => setContentDescription(e.target.value)}
            />
          </div>
          {/* Button */}
          <div className="mt-4 flex justify-between">
            <Button
              title="Cancel"
              className="bg-transparent text-black border hover:bg-CustomGray-50 hover:text-black"
              secondary
              type="button"
              onClick={() => setAddVideoModal(false)}
            />
            <Button
              title="Save Changes"
              secondary
              type="button"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddDocumentModal;
