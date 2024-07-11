import { apiSlice } from "./apiSlice.js";
import { AUTH_URL } from "./constants.js";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        data,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;

export default authApiSlice;
