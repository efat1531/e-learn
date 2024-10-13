import { apiSlice } from "./apiSlice";
import { ORDER_URL } from "./constants";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (body) => ({
        url: `${ORDER_URL}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    getOrderByPaymentID: builder.query({
      query: (id) => `${ORDER_URL}/payment/${id}`,
      providesTags: ["Order"],
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderByPaymentIDQuery } = orderApiSlice;
