import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  mode: "cors",
});

async function baseQueryWithAuth(args, api, extra) {
  const result = await baseQuery(args, api, extra);
  return result;
}

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Course", "Review", "User"],
  endpoints: (builder) => ({}),
});
