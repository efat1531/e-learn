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
    }),
  }),
});

export const {
  useCreateStripePaymentSessionMutation,
  useUpdateStripePaymentSessionMutation,
} = paymentApiSlice;

export default paymentApiSlice;
