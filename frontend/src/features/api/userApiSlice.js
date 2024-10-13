import { apiSlice } from "./apiSlice";
import { USER_URL } from "./constants";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchUser: builder.query({
      query: () => `${USER_URL}/profile`,
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),
    fetchBestInstructors: builder.query({
      query: () => `${USER_URL}/best-instructors`,
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useFetchUserQuery, useFetchBestInstructorsQuery } = userApiSlice;
