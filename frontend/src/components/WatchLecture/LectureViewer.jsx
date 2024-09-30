import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import VideoViewer from "./VideoViewer";
import DocumentViewer from "./DocumentViewer";

const LectureViewer = () => {
  const { lectureId } = useParams();

  const { selectedCourseProgression } = useSelector((state) => state.course);
  if (!selectedCourseProgression) return null;
  const { courseContent, title } = selectedCourseProgression;
  const { content_id:content } = courseContent;

  //   let currentLecture = {};
  //   courseContent.filter((content) =>
  //     content.sectionContainer.map((lecture) => {
  //       if (lecture._id === lectureId) {
  //         currentLecture = lecture;
  //       }
  //     })
  //   );

  let currentLecture = null;
  let previousLecture = null;
  let traversingLecture = null;
  let found = 0;
  let nextLecture = null;

  const getMetaForViewer = () => {
    for (let i = 0; i < courseContent.length; i++) {
      courseContent[i].sectionContainer.map((lecture) => {
        if (lecture.content_id._id === lectureId && currentLecture == null) {
          currentLecture = lecture.content_id;
          found = 1;
          if (traversingLecture != null) previousLecture = traversingLecture;
        } 
        else if(currentLecture != null && found == 1)
        {
            nextLecture = lecture.content_id;
            found = 0;
        }
        else {
          traversingLecture = lecture.content_id;
        }
      });
    }
  };

  getMetaForViewer();  

  return currentLecture.contentType === "video" ? (
    <VideoViewer currentLecture={currentLecture} previousLecture={previousLecture} nextLecture={nextLecture} />
  ) : (
    <DocumentViewer currentLecture={currentLecture} previousLecture={previousLecture} nextLecture={nextLecture} />
  );
};
export default LectureViewer;
