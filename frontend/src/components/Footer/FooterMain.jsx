import React from "react";
import { ReactSVG } from "react-svg";
import GraduationCap from "../../assets/svg/GraduationCap.svg";
import SocialMediaLinks from "./SocialMediaIcon";
import FooterLinks from "./FooterLinks";

const FooterMain = () => {
  return (
    <footer
      id="footer"
      className="bg-CustomGray-900 flex pt-[5rem] flex-col justify-center items-center gap-5 text-white"
    >
      {/* <!-- Main Footer Start --> */}
      <div className="flex flex-col laptop:flex-row items-start gap-8 laptop:gap-[10rem] desktop:gap-[15rem]">
        {/* <!-- Footer Column 1 Start --> */}
        <div className="flex flex-col justify-center items-start gap-[1.62rem]">
          <div className="flex flex-col items-start gap-[1.25rem]">
            <div className="flex items-start gap-[0.575rem]">
              {/* Logo */}
              <ReactSVG
                src={GraduationCap}
                beforeInjection={(svg) => {
                  svg.setAttribute(
                    "style",
                    "width: 2.875rem; height: 2.875rem"
                  );
                }}
                className="w-[2.875rem] h-[2.875rem]"
              />
              <span className="text-justify text-[2.3rem] font-[600] leading-[2.852rem] tracking-[-0.069rem]">
                Sonorus
              </span>
            </div>
            <div className="text-gray-500 text-justify font-inter text-sm font-normal leading-[1.375rem] tracking-tight max-w-[26.5rem]">
              Aliquam rhoncus ligula est, non pulvinar elit convallis nec. Donec
              mattis odio at.
            </div>
          </div>
          {/* Socials */}
          <SocialMediaLinks />
        </div>
        {/* <!-- Footer Column 1 End --> */}

        {/* <!-- Footer Column 2 Start --> */}
        <FooterLinks
          title="Quick Links"
          links={[
            {
              name: "About",
              link: "/about",
            },
            {
              name: "Contact",
              link: "/contact",
            },
            {
              name: "Carrier",
              link: "/become-an-instructor",
            },
            {
              name: "Courses",
              link: "/courses",
            },
          ]}
        />
        {/* <!-- Footer Column 2 End --> */}

        {/* <!-- Footer Column 3 Start --> */}
        <FooterLinks
          title="Support"
          links={[
            {
              name: "FAQ",
              link: "/faq",
            },
            {
              name: "Help Center",
              link: "/help",
            },
            {
              name: "Terms & Condition",
              link: "/terms-and-conditions",
            },
            {
              name: "Privacy Policy",
              link: "/privacy-policy",
            },
          ]}
        />
        {/* <!-- Footer Column 3 End --> */}
      </div>
      {/* Footer Copyright start */}
      <div className="flex px-[18.75rem] py-[1.5rem] justify-between items-center bg-[#1D2026] shadow-[inset_0px_1px_0px_0px_rgba(54,59,71,0.5)] max-w-[100%]">
        <span className="text-[#8C94A3] text-justify font-inter text-[0.875rem] font-normal leading-[1.375rem] tracking-[-0.00875rem]">
          &copy; 2024 - <span className="font-[600] text-white">Sonorus</span>.
          Designed by{" "}
          <span className="font-[500] text-Primary-500">Efat Sikder</span>. All
          rights reserved
        </span>
      </div>

      {/* <!-- Footer Copyright End --> */}
    </footer>
  );
};

export default FooterMain;
