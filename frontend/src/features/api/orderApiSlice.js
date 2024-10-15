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
      keepUnusedDataFor: 5,
    }),
    getOrderById: builder.query({
      query: (id) => `${ORDER_URL}/${id}`,
      keepUnusedDataFor: 5,
    }),
    getUserOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Order"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderByPaymentIDQuery,
  useGetOrderByIdQuery,
  useGetUserOrdersQuery,
  useDeleteOrderMutation,
} = orderApiSlice;
