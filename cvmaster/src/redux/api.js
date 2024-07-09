import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL }),
  tagTypes: [
    "introduction",
    "summary",
    "languages",
    "experience",
    "education",
    "skills",
  ],
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
    addIntroduction: builder.mutation({
      query: (body) => ({
        url: "/introduction/create",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["introduction"],
    }),
    getIntroduction: builder.query({
      query: (query) => ({
        url: `/introduction/get?${query}`,
        method: "GET",
      }),
      providesTags: ["introduction"],
    }),
    addSummary: builder.mutation({
      query: (body) => ({
        url: "/summary",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["summary"],
    }),
    getSummary: builder.query({
      query: (query) => ({
        url: `/summary?${query}`,
        method: "GET",
      }),
      providesTags: ["summary"],
    }),
    addLanguages: builder.mutation({
      query: (body) => ({
        url: "/languages",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["languages"],
    }),
    getLanguages: builder.query({
      query: (query) => ({
        url: `/languages?${query}`,
        method: "GET",
      }),
      providesTags: ["languages"],
    }),
    addExperienceDetails: builder.mutation({
      query: (body) => ({
        url: "/experience/add",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["experience"],
    }),
    getExperienceList: builder.query({
      query: (query) => ({
        url: `/experience/get?${query}`,
        method: "GET",
      }),
      providesTags: ["experience"],
    }),
    getSingleExperience: builder.query({
      query: (query) => ({
        url: `/experience/single?${query}`,
        method: "GET",
      }),
    }),
    updateExperienceDetails: builder.mutation({
      query: (body) => ({
        url: "/experience/update",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["experience"],
    }),
    deleteExperience: builder.mutation({
      query: (body) => ({
        url: `/experience/delete`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["experience"],
    }),
    addSkills: builder.mutation({
      query: (body) => ({
        url: "/skills",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["skills"],
    }),
    getSkills: builder.query({
      query: (query) => ({
        url: `/skills?${query}`,
        method: "GET",
      }),
      providesTags: ["skills"],
    }),
    addEducationDetails: builder.mutation({
      query: (body) => ({
        url: "/education/add",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["education"],
    }),
    getEducationList: builder.query({
      query: (query) => ({
        url: `/education/get?${query}`,
        method: "GET",
      }),
      providesTags: ["education"],
    }),
    deleteEducation: builder.mutation({
      query: (body) => ({
        url: `/education/delete`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["education"],
    }),
    getSingleEducation: builder.query({
      query: (query) => ({
        url: `/education/single?${query}`,
        method: "GET",
      }),
    }),
    updateEducationDetails: builder.mutation({
      query: (body) => ({
        url: "/education/update",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["education"],
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useAddIntroductionMutation,
  useGetIntroductionQuery,
  useAddSummaryMutation,
  useGetSummaryQuery,
  useAddLanguagesMutation,
  useGetLanguagesQuery,
  useAddExperienceDetailsMutation,
  useGetExperienceListQuery,
  useDeleteExperienceMutation,
  useGetSingleExperienceQuery,
  useUpdateExperienceDetailsMutation,
  useAddSkillsMutation,
  useGetSkillsQuery,
  useAddEducationDetailsMutation,
  useGetEducationListQuery,
  useDeleteEducationMutation,
  useGetSingleEducationQuery,
  useUpdateEducationDetailsMutation,
} = api;
