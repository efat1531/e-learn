/* eslint-disable react/prop-types */
import { useLocation } from "react-router-dom";
import { SlBell } from "react-icons/sl";
import { CiMenuKebab } from "react-icons/ci";
import { useSelector } from "react-redux";

const TopBar = ({ setSidebarOpen }) => {
  const location = useLocation();
  const currentPage =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  const auth = useSelector((state) => state.auth);

  return (
    <div className="bg-white">
      <div className="container px-2 py-8">
        <div className="flex justify-between">
          {/* Left */}
          <div className="flex gap-4">
            {/* Ham BTN */}
            <div
              className="bg-Primary-200 flex items-center justify-center px-2 cursor-pointer xl:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <CiMenuKebab className="text-2xl fill-Primary-500" />
            </div>
            <div>
              <p className="text-CustomGray-600 text-sm">Good Morning</p>
              <p className="font-bold mt-2">
                {currentPage.split("-").join(" ").toUpperCase()}
              </p>
            </div>
          </div>
          {/* Right */}
          <div className="flex gap-4 items-center">
            <div className="p-3 bg-CustomGray-50 relative">
              <SlBell className="text-xl" />
              <span className="absolute w-2 h-2 rounded-full right-3.5 top-2.5 bg-Primary-600"></span>
            </div>
            <div className="avatar">
              <div className="w-12 rounded-full">
                {auth  && 
                  <img src={auth.profilePicture} />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
