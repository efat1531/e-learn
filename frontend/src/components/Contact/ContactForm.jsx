import Button from "../ui/Button";
import Input from "../ui/Input";
import TextArea from "../ui/TextArea";
const ContactForm = () => {
  return (
    <form action="post" className="bg-white p-8">
      {/* Form Header */}
      <div>
        <p className="text-2xl">Get In Touch</p>
        <p className="mt-4 text-gray-400">
          Feel free contact with us, we love to make new partners & friends
        </p>
      </div>
      {/* Form Body */}
      <div className="mt-8">
        <div className="flex gap-4">
          <Input
            label="First Name"
            id="first_name"
            type="text"
            placeholder="First Name..."
          />{" "}
          <Input
            label="Last Name"
            id="last_name"
            type="text"
            placeholder="Last Name..."
          />
        </div>
        <div className="mt-4">
          <Input
            label="Email"
            id="email"
            type="email"
            placeholder="Email Address"
          />
        </div>
        <div className="mt-4">
          <Input
            label="Subject"
            id="subject"
            type="text"
            placeholder="Message Subject"
          />
        </div>
        <div className="mt-4">
          <TextArea
            label="Message"
            id="subject"
            type="text"
            placeholder="Message"
          />
        </div>
        <div className="mt-4">
          <Button title="Send Message" secondary />
        </div>
      </div>
    </form>
  );
};
export default ContactForm;
