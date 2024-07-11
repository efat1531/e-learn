import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../features/api/authApiSlice";
import { clearCredentials } from "../../features/authSlice";
import { toast } from "react-toastify";

const routes = [
  { path: "/home", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
  { path: "/courses", label: "Courses" },
  { path: "/become-an-instructor", label: "Become an Instructor" },
  { path: "/forum", label: "Forum" },
  { path: "/shop", label: "Shop" },
];

const NavList = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [logoutApiCall] = useLogoutMutation();

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(clearCredentials());
      toast.success("Logged out successfully");
    } catch (error) {
      const message = error.data ? error.data.message : error.error.message;
      toast.error(message || "An error occurred");
    }
  };

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
      {!userInfo && (
        <li>
          <NavLink
            to="/login"
            className="group inline-flex p-4 bg-CustomGray-900 items-start duration-100 font-[500]"
          >
            <span className="text-[0.875rem] leading-5 tracking-[-0.00875rem] group-hover:text-white duration-100 group-hover:font-[600]">
              Sign In
            </span>
          </NavLink>
        </li>
      )}
      {userInfo && (
        <li>
          <div
            to="/profile"
            className="group inline-flex p-4 bg-CustomGray-900 items-start duration-100 font-[500] hover:cursor-pointer"
            onClick={handleLogout}
          >
            <span className="text-[0.875rem] leading-5 tracking-[-0.00875rem] group-hover:text-white duration-100 group-hover:font-[600] group-hover:cursor-pointer">
              Log Out
            </span>
          </div>
        </li>
      )}
    </ul>
  );
};

export default NavList;
