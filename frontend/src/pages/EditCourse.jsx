import { useState } from "react";
import { GoStack } from "react-icons/go";
import { IoClipboardOutline } from "react-icons/io5";
import { MdOutlinePlayCircle, MdOutlineVideoLibrary } from "react-icons/md";
import CreateCourseForm from "../components/Dashboard/CreateCourse/CreateCourseForm";
import EditCourseForm from "../components/Dashboard/EditCourse/EditCourseForm";

let tabs = [
  {
    id: 1,
    name: "Basic Information",
    slug: "basic",
    icon: <GoStack className="text-xl" />,
  },
  {
    id: 2,
    name: "Advance Information",
    slug: "advance",
    icon: <IoClipboardOutline className="text-xl" />,
  },
  {
    id: 3,
    name: "Curriculum",
    slug: "curriculum",
    icon: <MdOutlineVideoLibrary className="text-xl" />,
  },
  {
    id: 4,
    name: "Publish Course",
    slug: "publish",
    icon: <MdOutlinePlayCircle className="text-xl" />,
  },
];

const EditCourse = () => {
  const [currentTab, setCurrentTab] = useState("basic");

  return (
    <div className="container px-2 my-8">
      <div className="bg-white">
        {/* Create Course Tabs */}
        <div className="flex border-b gap-4">
          {/* Tab */}
          {tabs.map((t) => (
            <div
              key={t.id}
              className={`createCourseTab ${currentTab === t.slug && "active"}`}
              onClick={() => setCurrentTab(t.slug)}
            >
              {t.icon}
              <p>{t.name}</p>
            </div>
          ))}
        </div>
        {/* Form */}
        <EditCourseForm tab={currentTab} setCurrentTab={setCurrentTab} />
      </div>
    </div>
  );
};
export default EditCourse;
