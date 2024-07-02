import { Link } from "react-router-dom";
import Logo from "../..//assets/svg/GraduationCap.svg";
import CartIcon from "../../assets/Icon/CartIcon";
import FollowIcon from "../../assets/Icon/FollowIcon";
import NotificationIcon from "../../assets/Icon/NotificationIcon";
import Button from "../ui/Button";
import NavLinks from "./NavLinks";

const DesktopNav = () => {
  return (
    <nav className="hidden tablet:block">
      <div className="flex justify-between bg-CustomGray-900 text-CustomGray-500 px-8 items-center">
        {/* <!-- Nav Menu  --> */}
        <NavLinks />
        {/* <!-- Language Selection --> */}
      </div>
      {/* <!-- Logo + Account --> */}
      <div className="flex mx-8 my-7 items-center justify-between">
        {/* <!-- Logo --> */}
        <Link to="/">
          <div className="flex items-center select-none">
            <img src={Logo} alt="Logo" className="mx-2" />
            <div className="text-[32px] font-semibold text-neutral-800">
              Sonorous
            </div>
          </div>
        </Link>
        {/* <!-- Account Creation Notification Icon etc --> */}
        <div className="flex gap-6 items-center h-12">
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
          <div className="flex gap-3">
            <Link to="/register" className="group">
              <Button title="Create Account" />
            </Link>

            {/* <!-- Sign In Button --> */}
            <Link to="/login" className="group">
              <Button title="Sign In" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DesktopNav;
