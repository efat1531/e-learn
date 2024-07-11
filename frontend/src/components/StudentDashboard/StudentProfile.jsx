import React from "react";
import Button from "../ui/Button";
import {
  IoMdHome,
  IoMdBook,
  IoMdBookmarks,
  IoMdPerson,
  IoMdSettings,
} from "react-icons/io";
import { NavLink } from "react-router-dom";

const navLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <IoMdHome className="text-[1.25rem] " />,
  },
  {
    title: "Courses",
    href: "/courses",
    icon: <IoMdBook className="text-[1.25rem] " />,
  },
  {
    title: "My Courses",
    href: "/my-courses",
    icon: <IoMdBookmarks className="text-[1.25rem] " />,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: <IoMdPerson className="text-[1.25rem] " />,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <IoMdSettings className="text-[1.25rem]" />,
  },
];

function StudentProfile() {
  return (
    <div className="mx-auto w-full flex-col justify-center shrink-0">
      <div className="flex w-full p-10 justify-between items-center">
        <div className="flex items-center gap-5">
          <div className="w-[6.825rem] h-[6.825rem] rounded-full">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt=""
              className="w-full h-full rounded-full"
            />
          </div>
          <div className="flex flex-col justify-center items-start gap-[0.875rem]">
            <div className="text-CustomGray-900 leading-8 tracking-[-0.015rem] font-[600] text-[1.25rem]">
              John Doe
            </div>
            <div className="text-CustomGray-600 font-inter font-normal text-sm">
              Student
            </div>
          </div>
        </div>
        <Button title="Become an Instructor"></Button>
      </div>
      <div className="flex flex-col">
        {/* Divider */}
        <div className="w-full h-[1px] mb-1 bg-Primary-100"></div>
        {/* Nav Links */}
        <div className="flex gap-6 items-center justify-evenly">
          {navLinks.map((link, index) => (
            <NavLink
              to={`.${link.href}`}
              key={index}
              className={({ isActive }) =>
                `group flex gap-2  py-2 px-8 text-CustomGray-700 ${
                  isActive ? "border-Primary-500 border-b-2 text-gray-900" : ""
                }`
              }
            >
              <div className=" group-hover:text-Primary-500">{link.icon}</div>
              <div className=" text-[1rem] font-[500] leading-[1.375rem] group-hover:text-Primary-500">
                {link.title}
              </div>
            </NavLink>
          ))}
        </div>
        <div className="w-full h-[1px] bg-Primary-100"></div>
      </div>
    </div>
  );
}

export default StudentProfile;
