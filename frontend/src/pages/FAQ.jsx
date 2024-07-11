import PageHeader from "../components/Common/PageHeader";
import FAQBody from "../components/FAQ/FAQBody";
import Select from "../components/ui/Select";

const FAQ = () => {
  return (
    <div>
      <PageHeader
        title="FAQs"
        breadcrumb={[
          { name: "Home /", link: "/" },
          { name: " FAQs", link: null },
        ]}
      />
      <section className="container py-24">
        {/* Title */}
        <div className="lg:flex justify-between text-center lg:text-start">
          <h1>Frequently asked questions</h1>
          <div className="max-w-[200px] w-full mx-auto lg:mx-0 mt-8 lg:mt-0">
            <Select items={[{ value: "Student", label: "Student" }]} />
          </div>
        </div>
        {/* Main */}
        <FAQBody />
      </section>
    </div>
  );
};
export default FAQ;
