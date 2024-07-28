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
  }),
});

export const { useCreateOrderMutation } = orderApiSlice;
