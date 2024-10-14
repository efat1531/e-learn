import { apiSlice } from "./apiSlice";
import { UPLOAD_URL } from "./constants";

const uploadApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadUserImage: builder.mutation({
      query: (body) => ({
        url: `${UPLOAD_URL}/user`,
        method: 'POST',
        body: body
      }),
    }),
  }),
});

export const { useUploadUserImageMutation } = uploadApiSlice;
