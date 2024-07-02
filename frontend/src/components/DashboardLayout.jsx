import Sidebar from "./Dashboard/Sidebar";
import TopBar from "./Dashboard/TopBar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div>
        <TopBar />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
