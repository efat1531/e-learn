import { toast } from "react-toastify";
const toastOptions = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
};

const toastManager = {
  loading: (message) => {
    const id = toast.loading(message, { ...toastOptions, autoClose: false });
    return id;
  },
  success: (message) => {
    const id = toast.success(message, toastOptions);
    return id;
  },
  error: (message) => {
    const id = toast.error(message, toastOptions);
    return id;
  },
  info: (message) => {
    const id = toast.info(message, toastOptions);
    return id;
  },
  updateStatus: (toastId, { render, type }) => {
    try {
      const toastType = type === "success" ? "success" : "error";
      toast.update(toastId, {
        render: render,
        ...toastOptions,
        type: toastType,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error updating toast status:", error);
    }
  },
};
export { toastManager };
