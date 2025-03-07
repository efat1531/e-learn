import { apiSlice } from "./apiSlice";
import { PAYMENT_URL } from "./constants";

const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createStripePaymentSession: builder.mutation({
      query: (body) => ({
        url: `${PAYMENT_URL}/stripe/create-payment-intent`,
        method: "POST",
        body,
      }),
    }),
    updateStripePaymentSession: builder.mutation({
      query: (body) => ({
        url: `${PAYMENT_URL}/stripe/update-payment-intent`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    createAmarPayPaymentSession: builder.mutation({
      query: (body) => ({
        url: `${PAYMENT_URL}/amarPay/create-payment-intent`,
        method: "POST",
        body,
      }),
    }),
    updateAmarPayPaymentSession: builder.mutation({
      query: (body) => ({
        url: `${PAYMENT_URL}/amarPay/update-payment-intent`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useCreateStripePaymentSessionMutation,
  useUpdateStripePaymentSessionMutation,
  useCreateAmarPayPaymentSessionMutation,
  useUpdateAmarPayPaymentSessionMutation,
} = paymentApiSlice;

export default paymentApiSlice;
