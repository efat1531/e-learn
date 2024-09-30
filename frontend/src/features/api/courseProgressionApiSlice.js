import { apiSlice } from "./apiSlice";
import { COURSE_PROGRESSION_URL } from "./constants";

const courseProgressionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchCourseProgressions: builder.query({
      query: () => `${COURSE_PROGRESSION_URL}/me`,
      keepUnusedDataFor: 5,
    }),
    fetchCourseProgression: builder.query({
      query: (slug) => `${COURSE_PROGRESSION_URL}/me/${slug}`,
      keepUnusedDataFor: 5,
    }),
    updateCourseProgression: builder.mutation({
      query: ({ id, body }) => ({
        url: `${COURSE_PROGRESSION_URL}/${id}`,
        method: 'PATCH',
        body: body
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useFetchCourseProgressionsQuery,
  useFetchCourseProgressionQuery,
  useUpdateCourseProgressionMutation
} = courseProgressionApiSlice;
