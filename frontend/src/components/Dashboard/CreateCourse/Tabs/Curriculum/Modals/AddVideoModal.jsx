/* eslint-disable react/prop-types */
import { X } from "lucide-react";
import Button from "../../../../../ui/Button";
import Input from "../../../../../ui/Input";
import { useState } from "react";
import TextArea from "../../../../../ui/TextArea";

const AddVideoModal = ({
  content,
  setAddVideoModal,
  sectionIndex,
  lectureIndex,
  addContentToLecture,
}) => {
  const [contentURL, setContentURL] = useState(content.contentURL);
  const [contentDuration, setContentDuration] = useState(
    content.contentDuration
  );
  const [contentDescription, setContentDescription] = useState(
    content.contentDescription
  );

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modalContainer")) {
      setAddVideoModal(false);
    }
  };

  const handleSubmit = () => {
    // console.log(videoURL);
    addContentToLecture(sectionIndex, lectureIndex, {
      contentType: "video",
      contentURL: contentURL,
      contentDuration: Number(contentDuration),
      contentDescription: contentDescription,
    });
    setAddVideoModal(false);
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black/80 z-20 modalContainer"
      onClick={handleOutsideClick}
    >
      <div className="max-w-[768px] mx-auto mt-40 bg-white">
        <div className="border-b p-4 flex justify-between">
          <h5>Add Video</h5>
          <span
            className="text-CustomGray-400 cursor-pointer"
            onClick={() => setAddVideoModal(false)}
          >
            <X />
          </span>
        </div>
        {/* Body */}
        <div className="p-4">
          <div className="row">
            <Input
              id="videoURL"
              label="Video URL"
              placeholder="Enter your video URL here..."
              required
              type="url"
              value={contentURL}
              onChange={(e) => setContentURL(e.target.value)}
            />
            <Input
              id="contentDuration"
              label="Video Duration (in minutes)"
              placeholder="Enter your video duration here..."
              required
              type="number"
              value={contentDuration}
              onChange={(e) => setContentDuration(e.target.value)}
            />
          </div>
          <div className="row mt-4">
            <TextArea
              id="contentDescription"
              label="Video Description"
              placeholder="Enter your video description here..."
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
export default AddVideoModal;
