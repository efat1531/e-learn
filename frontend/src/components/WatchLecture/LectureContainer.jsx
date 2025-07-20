import InfoBar from "./InfoBar";
import { useSelector } from "react-redux";
import SectionList from "./SectionList";
import LectureViewer from "./LectureViewer";
import { useEffect, useState } from "react";

const LectureContainer = () => {
  const { selectedCourseProgression } = useSelector((state) => state.course);

  const [totalLectures, setTotalLectures] = useState(0);
  const [completedLectures, setCompletedLectures] = useState(0);

  useEffect(() => {
    if (selectedCourseProgression) {
      let totalLectures = 0;
      let completedLectures = 0;
      selectedCourseProgression.courseContent.map(c => {
        c.sectionContainer.map(lecture => {
          if (lecture.isCompleted) completedLectures++;
          totalLectures++;
        })
      })
      setTotalLectures(totalLectures)
      setCompletedLectures(completedLectures)
    }

  }, [selectedCourseProgression])

  if (!selectedCourseProgression) return null;
  const { courseContent } = selectedCourseProgression;

  const calculateProgress = () => {
    return (completedLectures / totalLectures) * 100;
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center w-full gap-10">
        <InfoBar />
      </div>
      <div className="flex gap-4">
        {/* Left Sidebar */}
        <div className="max-w-[400px] w-full">
          {/* Course Progess */}
          <div style={styles.progressContainer}>
            <div
              style={{
                ...styles.progressBar,
                width: `${calculateProgress()}%`,
              }}
            >
              {Math.round(calculateProgress())}%
            </div>
          </div>
          {courseContent.map((courseSection, index) => (
            <div key={index} className="w-full">
              <SectionList courseSection={courseSection} />
            </div>
          ))}
        </div>
        {/* Right Content Body */}
        <div className="max-w-[800px] w-full mx-auto p-4">
          <LectureViewer />
        </div>
      </div>
    </div>
  );
};
export default LectureContainer;

// Inline styles for simplicity
const styles = {
  progressContainer: {
    width: "100%",
    backgroundColor: "#f0f0f0",
    overflow: "hidden",
    height: "30px",
    marginTop: "10px",
  },
  progressBar: {
    backgroundColor: "#4caf50",
    height: "100%",
    color: "black",
    textAlign: "center",
    lineHeight: "30px",
  },
};