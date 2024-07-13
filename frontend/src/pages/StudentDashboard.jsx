import React from "react";
import StudentProfile from "../components/StudentDashboard/StudentProfile";
import { Outlet } from "react-router-dom";

function StudentDashboard() {
  return (
    <div className="relative w-full">
      {/* Background */}
      <div className="bg-Primary-100 w-full h-[30%] h-max-[20rem] absolute top-0 hidden lg:flex -z-10"></div>
      {/* Main Container */}
      <div className="w-full py-20">
        <div className="flex flex-col items-start gap-10 max-w-[82.5rem] mx-auto bg-white">
          <StudentProfile />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
