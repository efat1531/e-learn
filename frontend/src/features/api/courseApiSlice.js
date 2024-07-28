import { apiSlice } from "./apiSlice";
import { COURSE_URL } from "./constants";

const courseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllCourse: builder.query({
      query: () => `${COURSE_URL}/`,
      keepUnusedDataFor: 5,
    }),
    fetchCourse: builder.query({
      query: (slug) => `${COURSE_URL}/${slug}`,
      keepUnusedDataFor: 5,
    }),
    fetchTopCourse: builder.query({
      query: () => `${COURSE_URL}/top`,
      keepUnusedDataFor: 5,
    }),
    fetchRecentCourse: builder.query({
      query: ({ limit }) => `${COURSE_URL}/recent?limit=${limit}`,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useFetchAllCourseQuery,
  useFetchCourseQuery,
  useFetchTopCourseQuery,
  useFetchRecentCourseQuery,
} = courseApiSlice;
