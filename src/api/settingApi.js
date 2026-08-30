import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../config/config";
export const settingApi = createApi({
  reducerPath: "settingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.baseUrl,
    credentials: "include",
  }),
  tagTypes: ["getUserProfile"],
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => "/auth/getUserProfile",
      transformResponse: (response) => response.user,
      providesTags: ["getUserProfile"],
    }),
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
