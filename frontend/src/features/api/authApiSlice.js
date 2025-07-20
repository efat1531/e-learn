import { apiSlice } from "./apiSlice.js";
import { AUTH_URL } from "./constants.js";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
      }),
    }),
    verifyUser: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/verify`,
        method: "POST",
        body: data,
      }),
    }),
    fetchNewVerifyOtp: builder.query({
      query: (email) => ({
        url: `${AUTH_URL}/verify?email=${email}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useVerifyUserMutation, useLazyFetchNewVerifyOtpQuery } =
  authApiSlice;
