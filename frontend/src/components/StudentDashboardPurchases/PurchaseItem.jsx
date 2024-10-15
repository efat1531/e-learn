import { format } from "date-fns";
import { ChevronDown, ChevronUp, PlayCircle } from "lucide-react";
import { BsCardText, BsCash } from "react-icons/bs";

const PurchaseItem = ({ transaction, auth, expanded, onToggle }) => {
  const {
    createdAt,
    orderItems,
    paymentMethod,
    totalPrice,
    paymentResult: { transaction_id },
  } = transaction;

  if (!auth) return;

  return (
    <div className="border-b border-gray-200 p-8">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={onToggle}
      >
        <div>
          <h4>{format(createdAt, "do MMMM, yyyy 'at' h:mm a")}</h4>
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <PlayCircle size={20} className="text-purple-600" />{" "}
              {orderItems.length} Courses
            </span>
            <span className="flex items-center gap-2">
              <BsCash className="text-Primary-500 text-xl" /> {totalPrice} Taka{" "}
            </span>
            <span className="flex items-center gap-2">
              <BsCardText className="text-green-500 text-xl" />{" "}
              {paymentMethod.toUpperCase()}
            </span>
          </div>
        </div>
        <button className="text-orange-500">
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
      {expanded && (
        <div className="mt-4 flex flex-col md:flex-row md:divide-x-2 border p-4 bg-gray-50">
          {orderItems.map((item) => (
            <div
              key={item._id}
              className="flex w-full items-center justify-between space-x-4 p-4 "
            >
              <div>
                <p className="font-semibold">
                  Learn Ethical Hacking From Scratch
                </p>
                <p className="text-sm text-gray-500">
                  Course by: Marvin McKinney
                </p>
              </div>
              <span className="font-semibold">{item.price} Taka</span>
            </div>
          ))}

          <div className="bg-gray-50 p-4 rounded md:w-3/4 border-t md:border-t-0">
            <div>
              <h4>{format(createdAt, "do MMMM, yyyy 'at' h:mm a")}</h4>
              <div className="flex justify-between mt-6">
                <div>
                  <p className="text-sm text-gray-600">
                    {orderItems.length} Courses
                    <p className="text-sm text-gray-600">{totalPrice} Taka</p>
                  </p>
                </div>
                <div className="text-end">
                  <p className="text-sm text-gray-600">{auth.name}</p>
                  <p className="text-sm text-gray-600">{auth.email}</p>
                  <p className="text-sm text-gray-600 max-w-[200px] truncate">{transaction_id}</p>
                  <p className="text-sm text-gray-600">
                    {paymentMethod.toUpperCase()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default PurchaseItem;
