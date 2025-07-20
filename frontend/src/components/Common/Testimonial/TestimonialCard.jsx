import { Quote } from "lucide-react";

const TestimonialCard = ({ data }) => {
  return (
    <div>
      <div className="bg-gray-100 p-8 relative space-y-2">
        <span className="inline-block rotate-180">
          <Quote className="fill-Primary-500 stroke-none" />
        </span>
        <p className="text-center">{data.text}</p>
        <span className="flex justify-end">
          <Quote className="fill-Primary-500 stroke-none" />
        </span>
      </div>
      <div className="text-center mt-8">
        <p className="font-bold">{data.name}</p>
        <p className="text-gray-600 mt-2 text-sm">{data.company}</p>
      </div>
    </div>
  );
};
export default TestimonialCard;
