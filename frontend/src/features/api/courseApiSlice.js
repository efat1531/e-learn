import { apiSlice } from "./apiSlice";
import { COURSE_URL } from "./constants";

const courseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllCourse: builder.query({
      query: ({ title, sort }) => {
        const params = new URLSearchParams();
        if (title) params.append("title", title);
        if (sort) params.append("sort", sort);
        return `${COURSE_URL}?${params.toString()}`;
      },
      keepUnusedDataFor: 5,
    }),
    fetchCourse: builder.query({
      query: (slug) => `${COURSE_URL}/${slug}`,
      providesTags: ["singleCourse"],
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
    addToWishList: builder.mutation({
      query: (slug) => ({
        url: `${COURSE_URL}/${slug}/wishlist`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    removeFromWishList: builder.mutation({
      query: (slug) => ({
        url: `${COURSE_URL}/${slug}/wishlist`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useFetchAllCourseQuery,
  useFetchCourseQuery,
  useFetchTopCourseQuery,
  useFetchRecentCourseQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useAddToWishListMutation,
  useRemoveFromWishListMutation,
} = courseApiSlice;
