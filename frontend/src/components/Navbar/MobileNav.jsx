import { useState } from "react";
import Logo from "../..//assets/svg/GraduationCap.svg";
import CloseIcon from "../../assets/Icon/CloseIcon";
import MenuIcon from "../../assets/Icon/MenuIcon";
import NavBackground from "../../assets/images/BGMobile.jpg";
import MobileNavLinks from "./MobileNavLinks";

const MobileNav = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <nav className="tablet:hidden">
      {/* <!-- Logo --> */}
      <a href="#">
        <div className="flex flex-row px-8 py-8 items-center gap-1">
          <img
            src={Logo}
            alt=""
            className="scale-75 mobile:scale-90 h-12 w-12"
          />
          <div className="font-semibold text-[24px] mobile:text-[28px] text-neutral-800">
            Sonorous
          </div>
        </div>
      </a>
      {/* <!-- Side Menu Background Photo --> */}
      <button
        className="absolute h-7 w-7 z-[1000] top-[2.35rem] right-12 border-none mobile-nav-toggle"
        onClick={() => setSideBarOpen((prev) => !prev)}
      >
        {sideBarOpen ? (
          <CloseIcon />
        ) : (
          <>
            <MenuIcon />
            <span className="sr-only">Menu</span>
          </>
        )}
      </button>
      <div
        id="nav-mb-bg-image"
        className={`fixed top-0 ease-in duration-200 bottom-0 right-0 left-[35%] ${
          sideBarOpen ? "translate-x-0" : "translate-x-full"
        } `}
        style={{ backgroundImage: `url(${NavBackground})` }}
      ></div>
      <div
        id="nav-mb-menu-items"
        className={`fixed ease-in duration-200 top-0 bottom-0 right-0 left-[35%] flex flex-col py-[min(20vh,8rem)] px-12 mobile:px-16 bg-CustomGray-900 bg-opacity-80 gap-5 backdrop-blur-sm *:text-CustomGray-500 *:font-semibold *:text-xl *:tracking-tight ${
          sideBarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <MobileNavLinks />
      </div>
    </nav>
  );
};

export default MobileNav;
