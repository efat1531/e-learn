import React from "react";
import { NavLink } from "react-router-dom";

const routes = [
  { path: "/home", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
  { path: "/courses", label: "Courses" },
  { path: "/become-an-instructor", label: "Become an Instructor" },
];

const NavList = () => {
  return (
    <ul className="list-none m-0 p-0 pl-8 gap-4 flex bg-CustomGray-900 text-CustomGray-500 font-[500]">
      {routes.map((route) => (
        <li key={route.path}>
          <NavLink
            to={route.path}
            className={({ isActive }) =>
              `group inline-flex p-4 bg-CustomGray-900 items-start duration-100 font-[500] ${
                isActive
                  ? "shadow-[inset_0px_2px_0px_0px_#FF6636] text-white font-[600]"
                  : ""
              }`
            }
          >
            <span className="text-[0.875rem] leading-5 tracking-[-0.00875rem] group-hover:text-white duration-100 group-hover:font-[600]">
              {route.label}
            </span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavList;
