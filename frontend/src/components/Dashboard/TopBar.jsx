import { useLocation } from "react-router-dom";
import { SlBell } from "react-icons/sl";

import { useLocation } from "react-router-dom";
import { SlBell } from "react-icons/sl";

const TopBar = () => {
  const location = useLocation();
  const currentPage =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  return (
    <div className="bg-white">
      <div className="container  px-2 py-8">
        <div className="flex justify-between">
          {/* Left */}
          <div>
            <p className="text-CustomGray-600 text-sm">Good Morning</p>
            <p className="font-bold">
              {currentPage.split("-").join(" ").toUpperCase()}
            </p>
          </div>
          {/* Right */}
          <div className="flex gap-4 items-center">
            <div className="p-3 bg-CustomGray-50 relative">
              <SlBell className="text-xl" />
              <span className="absolute w-2 h-2 rounded-full right-3.5 top-2.5 bg-Primary-600"></span>
            </div>
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
          </div>
        </div>
      </div>
  const location = useLocation();
  const currentPage =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  return (
    <div className="bg-white">
      <div className="container  px-2 py-8">
        <div className="flex justify-between">
          {/* Left */}
          <div>
            <p className="text-CustomGray-600 text-sm">Good Morning</p>
            <p className="font-bold">
              {currentPage.split("-").join(" ").toUpperCase()}
            </p>
          </div>
          {/* Right */}
          <div className="flex gap-4 items-center">
            <div className="p-3 bg-CustomGray-50 relative">
              <SlBell className="text-xl" />
              <span className="absolute w-2 h-2 rounded-full right-3.5 top-2.5 bg-Primary-600"></span>
            </div>
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
