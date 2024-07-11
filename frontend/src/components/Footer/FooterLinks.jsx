import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { Link } from "react-router-dom";

const FooterLinks = ({ title, links }) => {
  const [active, setActive] = useState("");

  const setActiveLink = (index) => {
    setActive(index);
  };

  const setInactiveLink = () => {
    setActive("");
  };

  return (
    <div className="flex flex-col gap-[1.25rem]">
      <div className="text-[0.875rem] font-[500] leading-[100%] text-justify">
        {title}
      </div>
      <div className="flex flex-col items-start">
        {links.map((link, index) => (
          <Link
            to={link.link}
            key={index}
            className="group py-[0.375rem] flex justify-center items-center gap-[0.75rem] hover:bg-[#1D2026] hover:shadow-[inset_0_-1.5px_0_0_#FF6636] duration-200"
            onMouseEnter={() => setActiveLink(index)}
            onMouseLeave={() => setInactiveLink()}
          >
            <span className="text-gray-500 text-justify text-[0.875rem] text-base font-normal leading-7 tracking-tighter group-hover:text-white">
              {link.name}
            </span>
            {active === index && <FaArrowRightFromBracket size="0.85rem" />}
          </Link>
        ))}
      </div>
    </div>
  );
};

FooterLinks.propTypes = {
  title: PropTypes.string,
  links: PropTypes.array,
};

export default FooterLinks;
