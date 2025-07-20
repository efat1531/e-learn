/* eslint-disable react/prop-types */
import { X } from "lucide-react";
import Button from "../../../../../ui/Button";
import Input from "../../../../../ui/Input";
import { useState } from "react";

const EditSectionNameModal = ({
  setEditSectionModalOpen,
  editSectionName,
  name,
  index
}) => {
  const [sectionName, setSectionName] = useState(name);

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modalContainer")) {
      setEditSectionModalOpen(false);
    }
  };

  const handleSubmit = () => {
    console.log(sectionName);
    editSectionName(index, sectionName);
    setEditSectionModalOpen(false);
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black/80 z-20 modalContainer"
      onClick={handleOutsideClick}
    >
      <div className="max-w-[768px] mx-auto mt-40 bg-white">
        <div className="border-b p-4 flex justify-between">
          <h5>Edit Section Name</h5>
          <span
            className="text-CustomGray-400 cursor-pointer"
            onClick={() => setEditSectionModalOpen(false)}
          >
            <X />
          </span>
        </div>
        {/* Body */}
        <div className="p-4">
          <div className="row">
            <Input
              id="sectionName"
              label="Section Name"
              placeholder="Write your section name here..."
              required
              type="text"
              value={sectionName}
              onChange={(e) => setSectionName(e.target.value)}
            />
          </div>
          {/* Button */}
          <div className="mt-4 flex justify-between">
            <Button
              title="Cancel"
              className="bg-transparent text-black border hover:bg-CustomGray-50 hover:text-black"
              secondary
              type="button"
              onClick={() => setEditSectionModalOpen(false)}
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
export default EditSectionNameModal;
