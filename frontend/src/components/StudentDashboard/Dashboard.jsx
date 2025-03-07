import React, { useContext } from "react";
import { FaRegCirclePlay } from "react-icons/fa6";
import { LuCheckSquare, LuTrophy } from "react-icons/lu";
import { MdPeopleOutline } from "react-icons/md";
import { ProfileContext } from "../../pages/StudentDashboard";

function Dashboard() {
  const profile = useContext(ProfileContext);

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <div className="text-gray-900 text-[1.5rem] font-[600] leading-8">
          Dashboard
        </div>
        <div className="flex flex-start gap-6 w-full">
          <div className="flex p-6 items-center gap-6 bg-Primary-100">
            <div className="bg-white p-[.875rem]">
              <FaRegCirclePlay className="text-Primary-500 text-[2rem]" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-CustomGray-900 text-[1.25rem] leading-6">
                {profile.courses.length}
              </div>
              <div className="text-CustomGray-600 text-sm w-[11rem]">
                {profile.courses.length > 1 ? "Courses" : "Course"}
                {profile.role === "instructor" ? " Created" : " Enrolled"}
              </div>
            </div>
          </div>
          <div className="flex p-6 items-center gap-6 bg-Secondary-100">
            <div className="bg-white p-[.875rem]">
              <LuCheckSquare className="text-Secondary-500 text-[2rem]" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-CustomGray-900 text-[1.25rem] leading-6">
                {profile.courses.length}
              </div>
              <div className="text-CustomGray-600 text-sm w-[11rem]">
                Active Courses
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
