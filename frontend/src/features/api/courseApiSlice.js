import { apiSlice } from "./apiSlice";
import { COURSE_URL } from "./constants";

const courseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllCourse: builder.query({
      query: () => `${COURSE_URL}/`,
    }),
    fetchCourse: builder.query({
      query: (slug) => `${COURSE_URL}/${slug}`,
    }),
  }),
});

export const { useFetchAllCourseQuery, useFetchCourseQuery } = courseApiSlice;
