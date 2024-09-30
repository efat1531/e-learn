import { apiSlice } from "./apiSlice";
import { COURSE_PROGRESSION_URL } from "./constants";

const courseProgressionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchCourseProgressions: builder.query({
      query: () => `${COURSE_PROGRESSION_URL}/`,
      keepUnusedDataFor: 5,
    }),
    fetchCourseProgression: builder.query({
      query: (slug) => `${COURSE_PROGRESSION_URL}/${slug}`,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useFetchCourseProgressionsQuery,
  useFetchCourseProgressionQuery
} = courseProgressionApiSlice;
