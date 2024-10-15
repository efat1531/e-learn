import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  mode: "cors",
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [
    "Course",
    "Review",
    "User",
    "singleCourse",
    "InstructorRequest",
    "Order",
  ],
  endpoints: (builder) => ({}),
});
