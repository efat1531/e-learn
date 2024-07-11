import { ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react";

const FAQItem = ({ FAQ }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div
        className={`p-4 border font-semibold flex justify-between items-center cursor-pointer ${
          open && "bg-black text-white"
        }`}
        onClick={() => setOpen((prev) => !prev)}
      >
        {FAQ.title}
        <span>{!open ? <ArrowDown /> : <ArrowUp />}</span>
      </div>
      {open && <div className="bg-white shadow-lg p-8">{FAQ.body}</div>}
    </div>
  );
};
export default FAQItem;
