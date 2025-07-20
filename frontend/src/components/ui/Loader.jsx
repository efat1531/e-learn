import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex justify-between items-center">
      <Loader2 size={25} className="animate-spin" />
    </div>
  );
};

export default Loader;
