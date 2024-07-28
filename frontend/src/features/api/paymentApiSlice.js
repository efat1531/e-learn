import { apiSlice } from "./apiSlice";
import { PAYMENT_URL } from "./constants";

const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPayment: builder.mutation({
      query: (orderDetails, userData) => ({
        url: `${PAYMENT_URL}/create-checkout-session`,
        method: "POST",
        body: {
          price: orderDetails.totalPrice,
          currency: orderDetails.currency,
          productData: orderDetails.productData,
          userData: userData,
        },
      }),
    }),
  }),
});

export const { useCreatePaymentMutation } = paymentApiSlice;

export default paymentApiSlice;
