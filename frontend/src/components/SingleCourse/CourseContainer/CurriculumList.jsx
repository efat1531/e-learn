import PropTypes from "prop-types";
import { MdPlayCircle } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { GiDuration } from "react-icons/gi";

const CourseCurriculumList = ({ lesson }) => {
  return (
    <div className="flex w-full justify-between p-0 px-6 group hover:cursor-pointer">
      <div className="flex flex-row items-center gap-2 pl-4">
        {lesson.contentType === "video" && (
          <MdPlayCircle className="text-gray-600 group-hover:text-Primary-500" />
        )}
        {lesson.contentType === "document" && (
          <FaFileAlt className="text-gray-600 group-hover:text-Primary-500" />
        )}
        <div className="text-gray-700 text-sm font-normal leading-[1.375rem] tracking-tighter group-hover:text-Primary-500">
          {lesson.contentTitle}
        </div>
      </div>
      {lesson.contentType === "video" && (
        <div className="flex gap-1 items-center">
          <GiDuration className="text-gray-500 group-hover:text-Primary-500" />
          <div className="text-gray-500 font-inter text-sm font-normal leading-5 tracking-tighter group-hover:text-CustomGray-900">
            {convertDuration(lesson.contentDuration)}
          </div>
        </div>
      )}
    </div>
  );
};

CourseCurriculumList.propTypes = {
  lesson: PropTypes.shape({
    contentTitle: PropTypes.string.isRequired,
    contentType: PropTypes.string.isRequired,
    contentDuration: PropTypes.number,
  }),
};

export default CourseCurriculumList;

const convertDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};
