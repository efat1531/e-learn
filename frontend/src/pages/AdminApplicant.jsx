import React from "react";
import { useSelector } from "react-redux";
import ApplicationList from "../components/AdminApplicants/AdminApplicants";

const AdminApplicant = () => {
  const role = useSelector((state) => state.auth.role);

  if (role !== "admin") {
    return (
      <div className="relative w-full">
        <div className="w-full">
          <div className="flex flex-col items-start gap-10 max-w-[82.5rem] mx-auto bg-white">
            <h1 className="text-4xl font-bold text-CustomBlack-100">
              You are not authorized to view this page.
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* Main Container */}
      <div className="w-full">
        <div className="flex flex-col items-start gap-10 max-w-[82.5rem] mx-auto bg-white">
          <ApplicationList />
        </div>
      </div>
    </div>
  );
};

export default AdminApplicant;
