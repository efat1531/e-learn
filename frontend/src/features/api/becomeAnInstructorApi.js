import { INSTRUCTOR_REQUEST_URL } from "./constants";
import { apiSlice } from "./apiSlice.js";

const instructorRequestApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    applyToBecomeAnInstructor: builder.mutation({
      query: (data) => ({
        url: INSTRUCTOR_REQUEST_URL,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useApplyToBecomeAnInstructorMutation } =
  instructorRequestApiSlice;
