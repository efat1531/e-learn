import { useState } from "react";
import Sidebar from "./Dashboard/Sidebar";
import TopBar from "./Dashboard/TopBar";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen,setSidebarOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="w-full bg-CustomGray-50">
        <TopBar setSidebarOpen={setSidebarOpen} />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
