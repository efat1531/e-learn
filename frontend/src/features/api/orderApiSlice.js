import { getOrderById } from "../../../../backend/controllers/orderController";
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
    getOrderById: builder.query({
      query: (id) => `${ORDER_URL}/${id}`,
      providesTags: ["Order"],
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderByPaymentIDQuery, useGetOrderByIdQuery } = orderApiSlice;
