import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (body) => ({
        url: "/sign-up",
        method: "POST",
        body: body,
      }),
    }),
    signIn: builder.mutation({
      query: (body) => ({
        url: "/sign-in",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = api;
