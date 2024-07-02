import PageHeader from "../components/Common/PageHeader";
import Branches from "../components/Contact/Branches";
import ContactUs from "../components/Contact/ContactUs";
import Hero from "../components/Contact/Hero";
import Map from "../components/Contact/Map";

const Contact = () => {
  return (
    <div>
      <PageHeader
        title="Contact"
        breadcrumb={[
          { name: "Home /", link: "/" },
          { name: " Contact", link: null },
        ]}
      />
      <Hero />
      <Branches />
      <ContactUs />
      <Map />
    </div>
  );
};
export default Contact;
