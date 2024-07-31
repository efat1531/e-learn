/* eslint-disable react/prop-types */
import { IoIosMenu } from "react-icons/io";
import Button from "../../../../ui/Button";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

const SectionLecture = ({ lecture }) => {
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
        <span className="cursor-pointer">
          <FaRegEdit />
        </span>
        <span className="cursor-pointer">
          <FaRegTrashAlt className="text-Primary-500" />
        </span>
      </p>
    </div>
  );
};
export default SectionLecture;
