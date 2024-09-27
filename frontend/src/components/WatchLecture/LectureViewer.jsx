import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import VideoViewer from "./VideoViewer";
import DocumentViewer from "./DocumentViewer";

const LectureViewer = () => {
  const { lectureId } = useParams();

  const { selectedCourse } = useSelector((state) => state.course);
  if (!selectedCourse) return null;
  const { courseContent, title } = selectedCourse;

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
        if (lecture._id === lectureId && currentLecture == null) {
          currentLecture = lecture;
          found = 1;
          if (traversingLecture != null) previousLecture = traversingLecture;
        } 
        else if(currentLecture != null && found == 1)
        {
            nextLecture = lecture;
            found = 0;
        }
        else {
          traversingLecture = lecture;
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
