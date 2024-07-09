import { ReactSVG } from "react-svg";
import GraduationCap from "../../assets/svg/GraduationCap.svg";
import { NavLink } from "react-router-dom";
import { PiSignOutBold } from "react-icons/pi";
import { MdOutlineSignalCellularAlt } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="max-w-[240px] w-full h-screen">
      <div className="flex flex-col fixed top-0 left-0 h-full w-fit bg-CustomGray-900 py-4 text-white">
        {/* Logo */}
        <div className="flex items-center gap-[0.575rem] ps-8 border-b border-CustomGray-600 pb-2">
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
        {/* Links */}
        <div className="flex-grow mt-4">
          <div className="grid">
            <NavLink to={"/dashboard"} className="dashboardNavLinks">
              <MdOutlineSignalCellularAlt /> Dashboard
            </NavLink>
            <NavLink to={"/dashboard"} className="dashboardNavLinks">
              <MdOutlineSignalCellularAlt /> Dashboard
            </NavLink>
            <NavLink to={"/dashboard"} className="dashboardNavLinks">
              <MdOutlineSignalCellularAlt /> Dashboard
            </NavLink>
            <NavLink to={"/dashboard"} className="dashboardNavLinks">
              <MdOutlineSignalCellularAlt /> Dashboard
            </NavLink>
          </div>
        </div>
        {/* Sign out button */}
        <div className="px-2">
          <div className="flex gap-2 items-center text-CustomGray-600 hover:text-white hover:bg-CustomGray-800 px-4 py-2 rounded-lg cursor-pointer">
            <PiSignOutBold className="text-xl" /> <span>Sign-out</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
