import { format } from "date-fns";
import { ChevronDown, ChevronUp, PlayCircle } from "lucide-react";
import { BsCardText, BsCash } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { useDeleteOrderMutation } from "../../features/api/orderApiSlice";
import { toastManager } from "../../components/ui/toastGeneral";

const PurchaseItem = ({ transaction, auth, expanded, onToggle }) => {
  const {
    createdAt,
    orderItems,
    paymentMethod,
    totalPrice,
    paymentResult: { transaction_id, status },
  } = transaction;
  const [deleteOrder] = useDeleteOrderMutation();

  if (!auth) return;

  const handleDelete = async (e) => {
    e.preventDefault();
    // delete order
    console.log(transaction);
    try {
      await deleteOrder(transaction._id).unwrap();
      toastManager.success("Order deleted successfully");
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
    } catch (error) {
      const message = error?.data?.message ?? "Failed to delete order";
      toastManager.error(message);
    }
  };

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
        <>
          <div className="mt-4 flex flex-col md:flex-row md:divide-x-2 border p-4 bg-gray-50">
            {orderItems.map((item) => (
              <div
                key={item._id}
                className="flex w-full items-center justify-between space-x-4 p-4 "
              >
                <div className="max-w-[10rem] max-h-[7.5rem]">
                  <img
                    src={item.course.titleImage}
                    alt={item.course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">{`Course by: ${item.course.instructor.name}`}</p>
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
                    <p className="text-sm text-gray-600 max-w-[200px] truncate">
                      {transaction_id}
                    </p>
                    <p className="text-sm text-gray-600">
                      {paymentMethod.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Button to delete unpaid order */}
          {status == "unpaid" && (
            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center text-white bg-Primary-600 hover:bg-Primary-500 focus:ring-4 focus:outline-none focus:ring-Primary-300 font-medium rounded-lg text-xs px-4 py-1 text-center me-2 mb-2 border border-Primary-600 hover:border-Primary-500 dark:bg-Primary-700 dark:hover:bg-Primary-600 dark:focus:ring-Primary-800"
              >
                <FaTrash className="mr-2" />
                Delete
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default PurchaseItem;
