import Gallery from "../components/AboutUs/Gallery";
import Goal from "../components/AboutUs/Goal";
import Hero from "../components/AboutUs/Hero";
import PageHeader from "../components/Common/PageHeader";
import TestimonialSection from "../components/Common/Testimonial/TestimonialSection";

const AboutUs = () => {
  return (
    <div>
      <PageHeader
        title="About"
        breadcrumb={[
          { name: "Home /", link: "/" },
          { name: " About", link: null },
        ]}
      />
      <Hero />
      <Goal />
      <Gallery />
      <TestimonialSection />
    </div>
  );
};
export default AboutUs;
