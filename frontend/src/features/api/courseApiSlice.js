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
    createCourse: builder.mutation({
      query: (body) => ({
        url: `${COURSE_URL}`,
        method: "POST",
        body: body,
      }),
    }),
    updateCourse: builder.mutation({
      query: ({ slug, body }) => ({
        url: `${COURSE_URL}/${slug}`,
        method: "PATCH",
        body: body,
      }),
    }),
  }),
});

export const {
  useFetchAllCourseQuery,
  useFetchCourseQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
} = courseApiSlice;
