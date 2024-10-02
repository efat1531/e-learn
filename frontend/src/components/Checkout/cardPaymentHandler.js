import { toastManager } from "../../components/ui/toastGeneral";

class CardPaymentHandler {
  async processPayment({
    orderDetails,
    currency,
    productData,
    createOrder,
    createPaymentStripe,
  }) {
    const toastID = toastManager.loading("Processing payment");

    try {
      const { data: orderData } = await createOrder({
        ...orderDetails,
        paymentMethod: "card",
      }).unwrap();

      const { data: paymentData } = await createPaymentStripe({
        currency,
        productData,
        orderID: orderData._id,
      }).unwrap();

      toastManager.updateStatus(toastID, {
        render: "Order created successfully",
        type: "success",
      });

      setTimeout(() => {
        window.location.href = paymentData.url;
      }, 2000);
    } catch (error) {
      toastManager.updateStatus(toastID, {
        render:
          error?.data?.message ?? error?.message ?? "Failed to process payment",
        type: "error",
      });
    }
  }
}

export default CardPaymentHandler;
