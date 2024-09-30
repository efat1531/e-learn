import PropTypes from "prop-types";
import VideoPlayer from "../ui/VideoPlayer";
import { durationConversion } from "../../utils/Transformations";
import Button from "../ui/Button";
import { Link, useParams } from "react-router-dom";
import { useUpdateCourseProgressionMutation } from "../../features/api/courseProgressionApiSlice";
import { toastManager } from "../ui/toastGeneral";
import { setCourseProgression } from "../../features/courseSlice";
import { useDispatch } from "react-redux";

const VideoViewer = ({ currentLecture, previousLecture, nextLecture, progressId,currentLectureCompleted }) => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { contentURL, contentDescription, contentDuration, contentTitle, _id } =
    currentLecture;


  const [updateCourseProgression] = useUpdateCourseProgressionMutation();
  // console.log(currentLecture);

  const handleClick = async () => {
    const toastId = toastManager.loading("Updating...");
    try {
      const response = await updateCourseProgression({ id: progressId, body: { courseContentId: _id, isCompleted: true } });
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
  }

  return (
    <div>
      <div className="flex justify-center">
        <div className="hidden lg:flex">
          <VideoPlayer url={contentURL} width={765} height={425} />
        </div>
        {/* <div className="lg:hidden">
          <VideoPlayer url={contentURL} width={640} height={360} />
        </div> */}
      </div>
      <div className="mt-4 border p-4">
        <div className="flex justify-between text-CustomGray-900 font-[500] leading-6">
          <h4>{contentTitle}</h4>
          <span>{durationConversion(contentDuration)}</span>
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
          <Button secondary title="Mart as complete" disabled={currentLectureCompleted} onClick={handleClick} />
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
export default VideoViewer;

VideoViewer.propTypes = {
  currentLecture: PropTypes.object.isRequired,
  previousLecture: PropTypes.object,
  nextLecture: PropTypes.object,
};
