import Sidebar from "./Dashboard/Sidebar";
import TopBar from "./Dashboard/TopBar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <TopBar />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
