import React, { Suspense, createContext, lazy } from "react";
import { Outlet } from "react-router-dom";
import { useFetchUserQuery } from "../features/api/userApiSlice";

// Lazy load the StudentProfile component
const StudentProfile = lazy(() =>
  import("../components/StudentDashboard/StudentProfile")
);

export const ProfileContext = createContext();

function StudentDashboard() {
  const { data, isLoading, isError } = useFetchUserQuery();

  if (isLoading && !isError) return;

  const profile = data.data;

  return (
    <div className="relative w-full">
      {/* Background */}
      <div className="bg-Primary-100 w-full h-[19.7rem] absolute top-0 hidden lg:flex -z-10"></div>
      {/* Main Container */}
      <div className="w-full py-20">
        <div className="flex flex-col items-start gap-10 max-w-[82.5rem] mx-auto bg-white">
          <Suspense fallback={<div>Loading Student Profile...</div>}>
            <StudentProfile profile={profile} />
          </Suspense>
          <ProfileContext.Provider value={profile}>
            <Outlet />
          </ProfileContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
