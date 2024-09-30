import PropTypes from "prop-types";
import VideoPlayer from "../ui/VideoPlayer";
import { durationConversion } from "../../utils/Transformations";
import Button from "../ui/Button";
import { Link, useParams } from "react-router-dom";
import { toastManager } from "../ui/toastGeneral";
import { useUpdateCourseProgressionMutation } from "../../features/api/courseProgressionApiSlice";
import { setCourseProgression } from "../../features/courseSlice";
import { useDispatch } from "react-redux";

const DocumentViewer = ({
  currentLecture,
  previousLecture,
  nextLecture,
  progressId,
  currentLectureCompleted,
}) => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const { contentURL, contentDescription, contentTitle, _id } =
    currentLecture;

  const [updateCourseProgression] = useUpdateCourseProgressionMutation();

  const handleClick = async () => {
    const toastId = toastManager.loading("Updating...");
    try {
      const response = await updateCourseProgression({
        id: progressId,
        body: { courseContentId: _id, isCompleted: true },
      });
      toastManager.updateStatus(toastId, {
        render: "Course marked as completed",
        type: "success",
      });

      dispatch(setCourseProgression(response.data.data));
    } catch (error) {      
      const message = await (error?.data
        ? error?.data?.message
        : error?.error?.message || "Something went wrong");
      toastManager.updateStatus(toastId, {
        render: message,
        type: "reject",
      });
    }
  };

  return (
    <div>
      <div className="border p-4">
        <div className="flex justify-between text-CustomGray-900 font-[500] leading-6">
          <h4>{contentTitle}</h4>
        </div>
        <div className="p-4 bg-gray-50">
          <a href={contentURL} className="underline" target="_blank">
            Download Document
          </a>
        </div>
        <p className="mt-4">{contentDescription}</p>
        <div className="flex justify-between gap-4 mt-4">
          <Link
            to={
              previousLecture != null &&
              `/courses/${slug}/lecture/${previousLecture._id}`
            }
          >
            <Button title="Prev" disabled={previousLecture === null} />
          </Link>
          <Button
            secondary
            title="Mart as complete"
            disabled={currentLectureCompleted}
            onClick={handleClick}
          />
          <Link
            to={
              nextLecture != null &&
              `/courses/${slug}/lecture/${nextLecture._id}`
            }
          >
            <Button title="Next" disabled={nextLecture === null} />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default DocumentViewer;

DocumentViewer.propTypes = {
  currentLecture: PropTypes.object.isRequired,
  previousLecture: PropTypes.object,
  nextLecture: PropTypes.object,
};
