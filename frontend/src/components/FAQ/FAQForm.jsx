import Button from "../ui/Button";
import Input from "../ui/Input";
import TextArea from "../ui/TextArea";
const FAQForm = () => {
  return (
    <form action="post" className="bg-gray-100 p-8">
      {/* Form Header */}
      <div>
        <p className="text-2xl">Don’t find your answer!</p>
        <p className="mt-4 text-gray-400">
          Don’t worry, write your question here and our support team will help
          you.
        </p>
      </div>
      {/* Form Body */}
      <div className="mt-8">
        <Input id="subject" type="text" placeholder="Subject" />
      </div>
      <div className="mt-4">
        <TextArea id="subject" type="text" placeholder="Message" />
      </div>
      <div className="mt-4">
        <Button title="Submit Question" secondary />
      </div>
    </form>
  );
};
export default FAQForm;
