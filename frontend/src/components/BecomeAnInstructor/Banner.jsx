import React from "react";
import BecomeAnInstructorBG from "../../assets/images/BecomeAnInstructorBG.png";

const BannerBecomeAnInstructor = () => {
  return (
    <section className="w-full flex gap-6 mt-8 items-center justify-center">
      {/* Contents */}
      <div className="flex flex-col items-start gap-10">
        {/* Info */}
        <div className="flex flex-col items-start gap-10">
          <div className="w-full text-[4rem] font-semibold leading-[4.25rem]">
            Become an Instructor
          </div>
          <div className="text-CustomGray-700 text-2xl max-w-[40.5rem]">
            Become an instructor & start teaching with 26k certified
            instructors. Create a success story with 67.1k Students — Grow
            yourself with 71 countries.
          </div>
        </div>
        {/* Buttons */}
        <div className="flex px-10 justify-center items-center gap-3 bg-Primary-500 hover:cursor-pointer">
          <div className="text-white text-xl leading-[4rem] tracking-[-0.0125rem] capitalize font-semibold">
            Get Started
          </div>
        </div>
      </div>
      {/* Image */}
      <div className="">
        <img
          loading="lazy"
          src={BecomeAnInstructorBG}
          alt="Instructor teaching students"
          className="object-contain self-stretch my-auto aspect-square max-w-[40.5rem]"
        />
      </div>
    </section>
  );
};

export default BannerBecomeAnInstructor;
