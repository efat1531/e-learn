import { Link } from "react-router-dom";
import HeroBanner1 from "../../assets/images/hero-banner-1.png";
import HeroBanner2 from "../../assets/images/hero-banner-2.png";
import HeroBanner3 from "../../assets/images/hero-banner-3.png";
import HomeBanner from "../../assets/svg/HomePageIllustration.svg";

const Hero = () => {
  return (
    <>
      <section>
        <div className="flex mx-5 justify-evenly flex-col md:flex-row gap-8 md:gap-0 items-center">
          <div className="">Some text about Sonorus Educaion</div>
          <div className="">
            <img
              src={HomeBanner}
              alt=""
              className="aspect-auto max-h-[20rem] laptop:max-h-[30rem] desktop:max-h-[40rem]"
            />
          </div>
        </div>
      </section>
      <section id="hero">
        {/* <!-- Hero Item Start --> */}
        <div className="hero-item grid grid-cols-1 lg:grid-cols-2 gap-4 bg-gray-200">
          {/* <!-- Hero Section Details Start --> */}
          <div className="hero-details flex items-center">
            <div className="p-8">
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
          {/* <!-- Hero Section Details End --> */}
          {/* <!-- Hero Section Image Start --> */}
          <div className="hero-img">
            <img
              src={HeroBanner1}
              alt="Hero Banner"
              className="tablet:clip-path-image-landing-page"
            />
          </div>
          {/* <!-- Hero Section Image End --> */}
        </div>
        {/* <!-- Hero Item End --> */}
        {/* <!-- Hero Item Start --> */}
        <div className="hero-item grid grid-cols-1 lg:grid-cols-2 gap-4 bg-white">
          {/* <!-- Hero Section Image Start --> */}
          <div className="hero-img">
            <img src={HeroBanner2} alt="Hero Banner" />
          </div>
          {/* <!-- Hero Section Image End --> */}
          {/* <!-- Hero Section Details Start --> */}
          <div className="hero-details flex items-center">
            <div className="p-8">
              <h1>
                Speak Globally:
                <br />
                Master Phonetics
              </h1>
              <p className="mt-8 mb-4">
                Voice the edge: Impress global partners, build trust, avoid
                mishaps. Learn phonetics, speak with mastery
              </p>
              <button className="btn-primary w-fit">Load More</button>
            </div>
          </div>
          {/* <!-- Hero Section Details End --> */}
        </div>
        {/* <!-- Hero Item End --> */}
        {/* <!-- Hero Item Start --> */}
        <div className="hero-item grid grid-cols-1 lg:grid-cols-2 gap-4 bg-gray-200">
          {/* <!-- Hero Section Details Start --> */}
          <div className="hero-details flex items-center">
            <div className="p-8">
              <h1>
                Speak Clearly,
                <br />
                Conquer Globally
              </h1>
              <p className="mt-8 mb-4">
                Hear words whisper secrets? Unlock phonics, unlock their magic!
              </p>
              <Link href="#" className="btn-primary w-fit">
                Create Account
              </Link>
            </div>
          </div>
          {/* <!-- Hero Section Details End --> */}
          {/* <!-- Hero Section Image Start --> */}
          <div className="hero-img">
            <img
              src={HeroBanner3}
              alt="Hero Banner"
              className="tablet:clip-path-image-landing-page"
            />
          </div>
          {/* <!-- Hero Section Image End --> */}
        </div>
        {/* <!-- Hero Item End --> */}
      </section>
    </>
  );
};

export default Hero;
