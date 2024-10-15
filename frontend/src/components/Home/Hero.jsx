import { Link } from "react-router-dom";
import HeroBanner1 from "../../assets/images/hero-banner-1.png";
import HeroBanner2 from "../../assets/images/hero-banner-2.png";
import HeroBanner3 from "../../assets/images/hero-banner-3.png";
import HomeBanner from "../../assets/images/sonorusEducation.png";
import Photo from "../../assets/images/photo.jpeg";
import NewPhoto from "../../assets/images/newPhoto.png";

const Hero = () => {
  return (
    <>
      <section>
        <div className="aspect-[12/5] relative">
          <img src={Photo} alt="" className="bg-cover aspect-auto" />
          <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-800 opacity-80 mix-blend-multiply"></div>
          <div className="absolute top-[50%] right-[10%]">
            <div className="text-white relative z-[1] text-4xl lg:text-5xl desktop:text-7xl font-[600] bg-slate-600/40 px-4 py-2 tracking-tight right-8 text-right  leading-snug">
              <span className="px-2">Unlock Your Potential</span>
            </div>
            <div className="text-white absolute top-[90%] z-[1] px-4 py-2 font-[500] right-8 bg-stone-600/30 desktop:text-3xl text-right ">
              <span className="px-2">
                Embark on a Journey of
                <br /> Discovery, Growth, and Excellence
              </span>
            </div>
          </div>
        </div>
      </section>
      <section id="hero">
        {/* <!-- Hero Item Start --> */}
        <div className="hero-item grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-0 lg:gap-y-2">
          {/* <!-- Hero Section Details Start --> */}
          <div className="hero-details flex items-center bg-CustomGray-50">
            <div className="p-8 lg:px-12 desktop:px-24 ">
              <h1>
                Learn with expert
                <br />
                anytime anywhere
              </h1>
              <p className="mt-8 mb-4">
                Our mission is to help people to find the best course online and
                learn with expert anytime, anywhere.
              </p>
              <button className="btn-primary w-fit">Load More</button>
            </div>
          </div>

          <div className="hero-img bg-CustomGray-50">
            <img
              src={HeroBanner1}
              alt="Hero Banner"
              className="tablet:clip-path-image-landing-page"
            />
          </div>
          {/* Hero second */}
          <div className="hero-img bg-white">
            <img
              src={HeroBanner2}
              alt="Hero Banner"
              className="tablet:clip-path-image-landing-page-reverse"
            />
          </div>
          <div className="hero-details flex items-center bg-white">
            <div className="p-8 lg:px-12 desktop:px-24 ">
              <h1>
                Learn with expert
                <br />
                anytime anywhere
              </h1>
              <p className="mt-8 mb-4">
                Our mission is to help people to find the best course online and
                learn with expert anytime, anywhere.
              </p>
              <button className="btn-primary w-fit">Load More</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
