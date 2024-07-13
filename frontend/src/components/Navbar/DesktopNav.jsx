import React from "react";
import { NavLink, Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import Logo from "../..//assets/svg/GraduationCap.svg";
import CartIcon from "../../assets/Icon/CartIcon";
import FollowIcon from "../../assets/Icon/FollowIcon";
import NotificationIcon from "../../assets/Icon/NotificationIcon";
import Button from "../ui/Button";
import NavLinks from "./NavLinksDesktop";
import { useSelector } from "react-redux";

const DesktopNav = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <nav className="hidden tablet:block">
      <NavLinks />
      <div className="flex px-8 py-[1.81rem] items-center justify-between shadow-[inset_0px_-1px_0px_0px_#E9EAF0]">
        {/* Logo */}
        <NavLink className="flex items-center gap-2 justify-center">
          <ReactSVG
            src={Logo}
            beforeInjection={(svg) => {
              svg.setAttribute("style", "width: 2.5rem; height: 2.5rem");
            }}
          />
          <span className="text-[2rem] font-[600] text-CustomGray-900 leading-9 tracking-tighter">
            Sonorus
          </span>
        </NavLink>
        {/* Right Side */}
        <div className="flex items-center gap-6">
          {/* <!-- notification Button --> */}
          <div className="group">
            <button className="noti-btn" name="notification-btn">
              <NotificationIcon />
            </button>
          </div>
          {/* <!-- Follow Button --> */}
          <div className="group">
            <button type="button" className="follow-btn" name="follow-btn">
              <FollowIcon />
            </button>
          </div>
          {/* <!-- Cart Button --> */}
          <div className="group">
            <button className="cart-btn" name="shopping-cart-btn">
              <CartIcon />
            </button>
          </div>
          {/* <!-- Create Account Button --> */}
          {!userInfo && (
            <div className="flex gap-3">
              <Link to="/register" className="group">
                <Button title="Create Account" />
              </Link>

              {/* <!-- Sign In Button --> */}
              <Link to="/login" className="group">
                <Button title="Sign In" />
              </Link>
            </div>
          )}
          {userInfo && (
            <Link to="/student" className="group">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DesktopNav;
