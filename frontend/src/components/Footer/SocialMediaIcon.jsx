import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";

const socialMediaLinks = [
  { name: "Facebook", icon: FaFacebookF },
  { name: "Instagram", icon: FaInstagram },
  { name: "LinkedIn", icon: FaLinkedin },
  { name: "XTwitter", icon: FaXTwitter },
  { name: "YouTube", icon: FaYoutube },
];

const SocialMediaLinks = () => (
  <div className="flex items-start gap-[0.75rem]">
    {socialMediaLinks.map(({ name, icon: Icon }) => (
      <a href="#" key={name}>
        <div className="flex p-[0.875rem] items-start gap-[0.625rem] bg-[#363B4766] hover:bg-Primary-500 hover:shadow-[0px_6px_20px_0px_rgba(204,82,43,0.50)]">
          <Icon size="1.125rem" />
        </div>
      </a>
    ))}
  </div>
);

export default SocialMediaLinks;
