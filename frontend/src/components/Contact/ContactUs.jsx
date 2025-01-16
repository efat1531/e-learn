import ContactForm from "./ContactForm";

const ContactUs = () => {
  return (
    <section className="bg-gray-100">
      <div className="container py-16">
        <div className="text-center">
          <h2>Contact Us</h2>
        </div>
        {/* Contact Section */}
        <div className="flex flex-col lg:flex-row gap-16 mt-8">
          {/* Details */}
          <div className="w-full">
            <p className="text-2xl">
              Will you be in Bangladesh or any other branches any time soon?
              Stop by the office! We&apos;d love to meet.
            </p>
            {/* Address */}
            <div className="mt-8">
              <div className="row flex justify-between pb-8">
                <span className="text-Primary-500 uppercase font-semibold">
                  Address
                </span>
                <div className="max-w-[300px] flex-grow">
                  <p>1702 Olympic Boulevard Santa Monica, CA 90404</p>
                </div>
              </div>
              <div className="row flex justify-between border-y py-8">
                <span className="text-Primary-500 uppercase font-semibold">
                  Phone Number
                </span>
                <div className="max-w-[300px] flex-grow">
                  <p>(480) 555-0103</p>
                  <p>(219) 555-0114</p>
                </div>
              </div>
              <div className="row flex justify-between pt-8">
                <span className="text-Primary-500 uppercase font-semibold">
                  Email address
                </span>
                <div className="max-w-[300px] flex-grow">
                  <p>help.sonorouslearning@gmail.com</p>
                  <p>career.eduguard@gamil.com</p>
                </div>
              </div>
            </div>
          </div>
          {/* Form */}
          <div className="w-full">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};
export default ContactUs;
