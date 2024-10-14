import React from "react";
import HelpSectionImage from "../../assets/images/BecomeAnInstructorHelp.png";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { toastManager } from "../ui/toastGeneral.jsx";

const HelpSection = () => {
  const handleEmailCopy = () => {
    const email = "help@elearn.com";
    toastManager.success("Email copied to clipboard");
    navigator.clipboard.writeText(email);
  };

  return (
    <section className="w-full flex py-20 items-center justify-center gap-[8.5rem] bg-Primary-100">
      <div className="max-w-[40.5rem] max-h-[40.5rem] aspect-auto">
        <img
          loading="lazy"
          src={HelpSectionImage}
          alt="Instructor helping students"
          className="object-cover"
        />
      </div>
      {/* Help Center */}
      <div className="flex flex-col items-start gap-8 max-w-[33.5rem]">
        {/* Title and Desc */}
        <div className="w-full flex flex-col items-start gap-6">
          {/* Title */}
          <div className="w-full text-CustomGray-900 text-[2.5rem] font-semibold leading-[3rem] tracking-tight">
            Don’t worry we’re always here to help you
          </div>
          {/* Description */}
          <div className="w-full text-lg leading-6 tracking-[--0.01688rem] text-CustomGray-600 text-justify">
            Mauris aliquet ornare tortor, ut mollis arcu luctus quis. Phasellus
            nec augue malesuada, sagittis ligula vel, faucibus metus. Nam
            viverra metus eget nunc dignissim.
          </div>
        </div>
        {/* List */}
        <div className="flex flex-col items-start gap-3">
          {/* Item */}
          <HelpItem
            text={
              "Sed nec dapibus orci integer nisl turpis, eleifend sit amet aliquam vel."
            }
          />
          <HelpItem text="Those who are looking to reboot their work life and try a new profession that." />
          <HelpItem text="Nunc auctor consequat lorem, in posuere enim hendrerit sed." />
          <HelpItem text="Sed nec dapibus orci integer nisl turpis, eleifend sit amet aliquam vel." />
        </div>
        {/* Email */}
        <div className="flex items-center justify-center gap-4">
          {/* Icon */}
          <div className="rounded-full bg-white w-[3.5rem] h-[3.5rem] flex items-center justify-center">
            <MdOutlineMarkEmailRead className="w-6 h-6 text-Primary-500" />
          </div>
          {/* Info */}
          <div className="flex flex-col items-start gap-2">
            <div className="text-CustomGray-500 text-xs leading-3 font-medium uppercase">
              Email us, anytime anywhere
            </div>
            {/* Email */}
            <div className="hover:cursor-pointer text-CustomGray-900 text-lg leading-6 font-medium hover:text-Primary-500 hover:font-semibold">
              <span onClick={handleEmailCopy}> help@elearn.com </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpSection;

const HelpItem = ({ text }) => {
  return (
    <div className="flex items-center gap-2">
      {/* Icon */}
      <div className="flex w-6 h-6 justify-center items-center text-Primary-500">
        <FaRegArrowAltCircleRight className="w-full h-full" />
      </div>
      <div className="max-w-[31.5rem] text-CustomGray-900 text-sm">{text}</div>
    </div>
  );
};
