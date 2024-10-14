import { apiSlice } from "./apiSlice";
import { USER_URL } from "./constants";

const uploadApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadUserImage: builder.mutation({
      query: (body) => ({
        url: `${USER_URL}/upload/user`,
        method: 'POST',
        body: body
      }),
    }),
  }),
});

export const { useUploadUserImageMutation } = uploadApiSlice;
