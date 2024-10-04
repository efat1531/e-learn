import { apiSlice } from './apiSlice';
import { REVIEW_URL, COURSE_URL } from './constants';

const reviewApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createReview: builder.mutation({
            query: (body) => ({
                url: `${COURSE_URL}/${body.courseId}/reviews`,
                method: 'POST',
                body: body,
            }),
            invalidatesTags:["singleCourse"],
        }),
        updateReview: builder.mutation({
            query: (body) => ({
                url: `${REVIEW_URL}/${body.reviewId}`,
                method: 'PATCH',
                body: body,
            }),
            invalidatesTags:["singleCourse"],
        }),
    }),
});

export const { useCreateReviewMutation, useUpdateReviewMutation } = reviewApiSlice;