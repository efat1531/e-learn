import React from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import Logo from "../../assets/svg/GraduationCap.svg";
import Button from "../ui/Button";

const DesktopNavMin = () => {
  const location = useLocation();
  const path = location.pathname;
  return (
    <div className="w-full py-5 px-[18.25rem] flex justify-between items-center">
      <NavLink className="flex items-center gap-2 justify-center" to={"/home"}>
        <ReactSVG
          src={Logo}
          beforeInjection={(svg) => {
            svg.setAttribute("style", "width: 2.5rem; height: 2.5rem");
          }}
        />
        <span className="text-[2rem] font-[600] text-CustomGray-900 leading-9 tracking-tighter">
          E-Learn
        </span>
      </NavLink>
      <div className="flex justify-center gap-4 items-center">
        <div className="text-sm text-CustomGray-700">
          {path === "/register"
            ? `Already have an account?`
            : `Don't have an account?`}
        </div>
        <Link to={path === "/register" ? "/login" : "/register"}>
          <Button
            title={path === "/register" ? "Login" : "Sign Up"}
            className="px-6"
          />
        </Link>
      </div>
    </div>
  );
};

export default DesktopNavMin;
