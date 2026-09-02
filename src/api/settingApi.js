import { createApi } from "@reduxjs/toolkit/query/react";
import { settingBaseQuery } from "./baseQueries.js/settingBaseQuery";

export const settingApi = createApi({
  reducerPath: "settingApi",
  baseQuery: settingBaseQuery,
  tagTypes: ["getUserProfile"],

  endpoints: (builder) => ({
    // Get current user's profile
    getUserProfile: builder.query({
      query: () => "/auth/getUserProfile",
      transformResponse: (response) => response.user,
      providesTags: ["getUserProfile"],
    }),

    // Update current user's profile
    updateProfile: builder.mutation({
      query: (user) => ({
        url: "/auth/updateProfile",
        method: "PATCH",
        body: user,
      }),
      invalidatesTags: ["getUserProfile"],
    }),
  }),
});

export const { useGetUserProfileQuery, useUpdateProfileMutation } = settingApi;
