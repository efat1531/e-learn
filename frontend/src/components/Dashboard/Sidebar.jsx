import { ReactSVG } from "react-svg";
import GraduationCap from "../../assets/svg/GraduationCap.svg";
import { NavLink } from "react-router-dom";
import { PiSignOutBold } from "react-icons/pi";
import { MdOutlineSignalCellularAlt } from "react-icons/md";
import { IoAddCircleOutline, IoCloseCircleOutline } from "react-icons/io5";
import { GoStack } from "react-icons/go";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("sidebarContainer")) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      <div
        className={`fixed xl:relative xl:max-w-[280px] w-full h-full xl:h-auto min-h-screen bg-CustomGray-600/20 transition-all ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } xl:translate-x-0 sidebarContainer z-10`}
        onClick={handleOutsideClick}
      >
        <div className="flex flex-col top-0 left-0 h-full w-full max-w-[280px] bg-CustomGray-900 py-4 text-white">
          <div className="flex justify-between px-4 border-b pb-2">
            {/* Logo */}
            <div className="flex items-center gap-[0.575rem] border-CustomGray-600">
              {/* Logo */}
              <ReactSVG
                src={GraduationCap}
                beforeInjection={(svg) => {
                  svg.setAttribute("style", "width: 1.7rem;");
                }}
              />
              <span className="text-justify text-[1.4rem] font-[600] leading-[2.852rem] tracking-[-0.069rem] ">
                Sonorus
              </span>
            </div>
            <div
              className="bg-Primary-200 flex items-center justify-center px-2 cursor-pointer xl:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <IoCloseCircleOutline className="text-2xl stroke-Primary-500" />
            </div>
          </div>
          {/* Links */}
          <div className="flex-grow mt-4">
            <div className="grid" onClick={() => setSidebarOpen(false)}>
              <NavLink to={"/dashboard"} className="dashboardNavLinks" end>
                <MdOutlineSignalCellularAlt /> Dashboard
              </NavLink>
              <NavLink
                to={"/dashboard/create-course"}
                className="dashboardNavLinks"
                end
              >
                <IoAddCircleOutline /> Create New Course
              </NavLink>
              <NavLink
                to={"/dashboard/courses"}
                className="dashboardNavLinks"
                end
              >
                <GoStack /> All Courses
              </NavLink>
            </div>
          </div>
          {/* Sign out button */}
          <div className="px-2 xl:hidden">
            <div className="flex gap-2 items-center text-CustomGray-600 hover:text-white hover:bg-CustomGray-800 px-4 py-2 rounded-lg cursor-pointer">
              <PiSignOutBold className="text-xl" /> <span>Sign-out</span>
            </div>
          </div>
        </div>
      </div>
      {/* Sign out button */}
      <div className="px-2 hidden fixed xl:block max-w-[280px] w-full bottom-4 left-0 z-20">
        <div className="flex gap-2 items-center text-CustomGray-600 hover:text-white hover:bg-CustomGray-800 px-4 py-2 rounded-lg cursor-pointer">
          <PiSignOutBold className="text-xl" /> <span>Sign-out</span>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
