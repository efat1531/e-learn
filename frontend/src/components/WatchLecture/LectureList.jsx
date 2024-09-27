import { FaFileAlt } from "react-icons/fa";
import { GiDuration } from "react-icons/gi";
import { MdOutlinePauseCircleFilled, MdPlayCircle } from "react-icons/md";
import { Link, useParams } from "react-router-dom";

/* eslint-disable react/prop-types */
const LectureList = ({ lesson }) => {
  const { slug, lectureId } = useParams();

  return (
    <div className="flex w-full justify-between p-0 px-6 group hover:cursor-pointer">
      <div
        className={`flex flex-row items-center gap-2 pl-4 ${
          lesson._id == lectureId ? "text-Primary-500" : "text-gray-600"
        }`}
      >
        {lesson.contentType === "video" &&
          (lesson._id == lectureId ? (
            <MdOutlinePauseCircleFilled  className="group-hover:text-Primary-500" />
          ) : (
            <MdPlayCircle className=" group-hover:text-Primary-500" />
          ))}
        {lesson.contentType === "document" && (
          <FaFileAlt className=" group-hover:text-Primary-500" />
        )}
        <div className="text-sm font-normal leading-[1.375rem] tracking-tighter group-hover:text-Primary-500">
          <Link to={`/courses/${slug}/lecture/${lesson._id}`}>{lesson.contentTitle}</Link>
        </div>
      </div>
      {lesson.contentType === "video" && (
        <div
          className={`flex gap-1 items-center  ${
            lesson._id == lectureId ? "text-Primary-500" : "text-gray-600"
          }`}
        >
          <GiDuration className="group-hover:text-Primary-500" />
          <div className="font-inter text-sm font-normal leading-5 tracking-tighter group-hover:text-Primary-500">
            {convertDuration(lesson.contentDuration)}
          </div>
        </div>
      )}
    </div>
  );
};
export default LectureList;

const convertDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};
