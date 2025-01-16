/* eslint-disable react/prop-types */
import { PlusCircle, X } from "lucide-react";
import Button from "../../../../../ui/Button";
import Input from "../../../../../ui/Input";
import { useRef, useState } from "react";

const AddFileModal = ({
  file,
  setAddFileModalOpen,
  sectionIndex,
  lectureIndex,
  addFileToLecture,
}) => {
  const [productFile, setProductFile] = useState(file);

  const ref = useRef();
  const containerRef = useRef();

  const handleFileSelect = (e) => {
    e.preventDefault();
    const files = e.target.files;
    const file = files[0];
    setProductFile(file);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    const file = files[0];
    console.log(file);
    setProductFile(file);
  };

  const handleClick = () => {
    ref.current.click();
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modalContainer")) {
      setAddFileModalOpen(false);
    }
  };

  const handleSubmit = () => {
    // console.log(videoURL);
    addFileToLecture(sectionIndex, lectureIndex, productFile);
    setAddFileModalOpen(false);
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black/80 z-20 modalContainer"
      onClick={handleOutsideClick}
    >
      <div className="max-w-[768px] mx-auto mt-40 bg-white">
        <div className="border-b p-4 flex justify-between">
          <h5>Add File</h5>
          <span
            className="text-CustomGray-400 cursor-pointer"
            onClick={() => setAddFileModalOpen(false)}
          >
            <X />
          </span>
        </div>
        {/* Body */}
        <div className="p-4">
          {productFile && (
            <div className="pb-4">
              Selected File: <b>{productFile.name}</b>
            </div>
          )}
          <div className="row">
            <div
              className="border rounded p-8 transition-all cursor-pointer"
              ref={containerRef}
              onDragOver={(event) => {
                event.preventDefault();
                containerRef.current.classList.add("dragging");
              }}
              onDragLeave={(event) => {
                event.preventDefault();
                containerRef.current.classList.remove("dragging");
              }}
              onDrop={handleFileDrop}
              onClick={handleClick}
            >
              <input
                ref={ref}
                type="file"
                className="hidden"
                accept=".pdf, .word"
                onChange={handleFileSelect}
              />
              <div className="flex flex-col items-center justify-center space-y-4">
                <p className="text-xl">Attach File</p>
                <p className="text-sm">
                  Drag and drop a file or <b>browse file</b>
                </p>
              </div>
            </div>
          </div>
          {/* Button */}
          <div className="mt-4 flex justify-between">
            <Button
              title="Cancel"
              className="bg-transparent text-black border hover:bg-CustomGray-50 hover:text-black"
              secondary
              type="button"
              onClick={() => setAddFileModalOpen(false)}
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
export default AddFileModal;
