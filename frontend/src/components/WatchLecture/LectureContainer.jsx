import InfoBar from "./InfoBar";
import { useSelector } from "react-redux";
import SectionList from "./SectionList";

const LectureContainer = () => {
  const { selectedCourse } = useSelector((state) => state.course);
  if (!selectedCourse) return null;
  const { courseContent } = selectedCourse;

  return (
    <div className="w-full">
      <div className="flex flex-col items-center w-full gap-10">
        <InfoBar />
      </div>
      <div className="flex gap-4">
        {/* Left Sidebar */}
        <div className="max-w-[400px] w-full">
          {courseContent.map((courseSection, index) => (
            <div key={index} className="w-full">
              <SectionList courseSection={courseSection} />
            </div>
          ))}
        </div>
        {/* Right Content Body */}
        <div className="w-full">Ye</div>
      </div>
    </div>
  );
};
export default LectureContainer;
