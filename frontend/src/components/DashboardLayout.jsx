import { useState } from "react";
import Sidebar from "./Dashboard/Sidebar";
import TopBar from "./Dashboard/TopBar";
import DashboardFooter from "./Dashboard/DashboardFooter";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen,setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  if(!auth || auth.role != 'admin') navigate('/');

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
