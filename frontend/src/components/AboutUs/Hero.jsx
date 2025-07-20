import AboutUsBanner from "../../assets/images/aboutus.png";

const Hero = () => {
  return (
    <section className="container flex flex-col lg:flex-row gap-12 lg:gap-24 items-center py-16">
      {/* Text */}
      <div className="max-w-[650px] space-y-4 text-center lg:text-start">
        <p className="text-[5rem] font-semibold text-gray-200">2007-2021</p>
        <h1>We share knowledge with the world</h1>
        <p className="text-gray-600">
          Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent
          fermentum quam mauris. Fusce tempor et augue a aliquet. Donec non
          ipsum non risus egestas tincidunt at vitae nulla.
        </p>
      </div>
      {/* Image */}
      <div className="justify-end max-w-[1000px] ms-auto w-full">
        <div>
          <img src={AboutUsBanner} alt="About Us Banner" />
        </div>
      </div>
    </section>
  );
};
export default Hero;
