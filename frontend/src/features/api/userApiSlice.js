import { apiSlice } from "./apiSlice";
import { USER_URL } from "./constants";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchUser: builder.query({
      query: () => `${USER_URL}/profile`,
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: `${USER_URL}/profile`,
        method: "PATCH",
        body: body
      })
    }),
  }),
});

export const { useFetchUserQuery, useUpdateUserMutation } = userApiSlice;
