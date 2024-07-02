import { useState } from "react";
import FAQForm from "./FAQForm";
import FAQTable from "./FAQTable";
import FAQs from "./FAQs";
import Content from "./faqs.json";

const faqs = Content || [];

const FAQBody = () => {
  const [selectedFAQ, setSelectedFAQ] = useState(faqs[0]);
  return (
    <main className="container flex flex-col lg:flex-row justify-between gap-8 mt-12">
      {/* FAQ Table */}
      <div className="lg:max-w-[250px] w-full">
        <FAQTable
          content={Content}
          selectedFAQ={selectedFAQ}
          setSelectedFAQ={setSelectedFAQ}
        />
      </div>
      {/* FAQs */}
      <div className="w-full flex-grow">
        <FAQs content={selectedFAQ} />
      </div>
      {/* Form */}
      <div className="lg:max-w-[420px] w-full">
        <FAQForm />
      </div>
    </main>
  );
};
export default FAQBody;
