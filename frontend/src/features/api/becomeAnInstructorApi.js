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
      invalidatesTags: ["InstructorRequest"],
    }),
    viewAllApplications: builder.query({
      query: (email) => {
        const params = email ? `?email=${email}` : "";
        return `${INSTRUCTOR_REQUEST_URL}${params}`;
      },
      keepUnusedDataFor: 5,
      providesTags: ["InstructorRequest"],
    }),
    acceptApplication: builder.mutation({
      query: (id) => ({
        url: `${INSTRUCTOR_REQUEST_URL}/${id}/approve`,
        method: "PUT",
      }),
      invalidatesTags: ["InstructorRequest"],
    }),
    rejectApplication: builder.mutation({
      query: (id) => ({
        url: `${INSTRUCTOR_REQUEST_URL}/${id}/reject`,
        method: "PUT",
      }),
      invalidatesTags: ["InstructorRequest"],
    }),
  }),
});

export const {
  useApplyToBecomeAnInstructorMutation,
  useViewAllApplicationsQuery,
  useAcceptApplicationMutation,
  useRejectApplicationMutation,
} = instructorRequestApiSlice;
