import React from "react";
import BecomeAnInstructorRules from "../../assets/images/BecomeAnInstructorRules.png";

const RulesSection = () => {
  return (
    <section className="flex py-20 gap-[8.5rem] justify-center bg-white items-center">
      {/* Left Box */}
      <div className="flex flex-col items-start gap-6  max-w-[33.5rem]">
        <div className="w-full text-CustomGray-900 text-[2.5rem] font-semibold leading-[3rem] tracking-tight">
          Instructor rules & regulations
        </div>
        <div className="w-full text-CustomGray-600 text-lg leading-[1.5rem]">
          Sed auctor, nisl non elementum ornare, turpis orci consequat arcu, at
          iaculis quam leo nec libero. Aenean mollis turpis velit, id laoreet
          sem luctus in. Etiam et egestas lorem.
        </div>
        {/* List */}
        <div className="flex flex-col gap-3 items-start list-disc">
          <div className="text-CustomGray-900 text-[1rem] leading-6 pl-2">
            Sed ullamcorper libero quis condimentum pellentesque.
          </div>
          <div className="text-CustomGray-900 text-[1rem] leading-6 pl-2">
            Nam leo tortor, tempus et felis non.
          </div>
          <div className="text-CustomGray-900 text-[1rem] leading-6 pl-2">
            Porttitor faucibus erat. Integer eget purus non massa ultricies
            pretium ac sed eros.
          </div>
          <div className="text-CustomGray-900 text-[1rem] leading-6 pl-2">
            Vestibulum ultrices commodo tellus. Etiam eu lectus sit amet turpi.
          </div>
        </div>
      </div>
      {/* Right Box */}
      <div className="max-w-[30.5rem] max-h-[30.5rem] desktop-xl:max-w-[40.5rem] desktop-xl:max-h-[40.5rem] aspect-auto relative">
        <img
          loading="lazy"
          src={BecomeAnInstructorRules}
          alt="Instructor rules and regulations"
          className="object-cover"
        />
      </div>
    </section>
  );
};

export default RulesSection;
