import BookmarkIcon from "../../assets/Icon/BookmarkIcon";
import HomeIcon from "../../assets/Icon/HomeIcon";
import IdeaIcon from "../../assets/Icon/IdeaIcon";
import PhoneBookIcon from "../../assets/Icon/PhoneBookIcon";
import StoreIcon from "../../assets/Icon/StoreIcon";
import UserIcon from "../../assets/Icon/UserIcon";

const MobileNavLinks = () => {
  return (
    <>
      {/* <!-- Home --> */}
      <div className="group">
        <div className="flex items-center gap-2">
          <HomeIcon />
          <a
            href="#"
            className="group-hover:text-white group-hover:font-bold group-hover:scale-105 group-hover:duration-200"
          >
            Home
          </a>
        </div>
      </div>
      {/* <!-- Why Learn --> */}
      <div className="group">
        <div className="flex items-center gap-2">
          <IdeaIcon />
          <a
            href="#"
            className="group-hover:text-white group-hover:font-bold group-hover:scale-105 group-hover:duration-200"
          >
            Why Learn
          </a>
        </div>
      </div>
      {/* <!-- About US --> */}
      <div className="group">
        <div className="flex items-center gap-2">
          <UserIcon />
          <a
            href="#"
            className="group-hover:text-white group-hover:font-bold group-hover:scale-105 group-hover:duration-200"
          >
            About Us
          </a>
        </div>
      </div>
      {/* <!-- Contact Us --> */}
      <div className="group">
        <div className="flex items-center gap-2">
          <PhoneBookIcon />
          <a
            href="#"
            className="group-hover:text-white group-hover:font-bold group-hover:scale-105 group-hover:duration-200"
          >
            Contact Us
          </a>
        </div>
      </div>
      {/* <!-- Resources --> */}
      <div className="group">
        <div className="flex items-center gap-2">
          <BookmarkIcon />
          <a
            href="#"
            className="group-hover:text-white group-hover:font-bold group-hover:scale-105 group-hover:duration-200"
          >
            Resources
          </a>
        </div>
      </div>
      {/* <!-- Store --> */}
      <div className="group">
        <div className="flex items-center gap-2">
          <StoreIcon />
          <a
            href="#"
            className="group-hover:text-white group-hover:font-bold group-hover:scale-105 group-hover:duration-200"
          >
            Store
          </a>
        </div>
      </div>
    </>
  );
};

export default MobileNavLinks;
