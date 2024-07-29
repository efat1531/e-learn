import { useState } from "react";
import Sidebar from "./Dashboard/Sidebar";
import TopBar from "./Dashboard/TopBar";
import DashboardFooter from "./Dashboard/DashboardFooter";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen,setSidebarOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-col w-full bg-CustomGray-50">
        <TopBar setSidebarOpen={setSidebarOpen} />
        <main className="flex-grow">
        {children}
        </main>
        <DashboardFooter />
      </div>
    </div>
  );
};

export default DashboardLayout;
