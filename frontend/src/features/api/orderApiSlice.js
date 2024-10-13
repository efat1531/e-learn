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
    getUserOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}`,
        method: "GET",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useCreateOrderMutation, useGetUserOrdersQuery } = orderApiSlice;
