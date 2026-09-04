import { createApi } from "@reduxjs/toolkit/query/react";
import { qrBaseQuery } from "./baseQueries.js/qrBaseQuery.jsx";

export const qrApi = createApi({
  reducerPath: "qrApi",
  baseQuery: qrBaseQuery,

  // Used for cache invalidation
  tagTypes: ["getAllQrs", "getQR", "getAnalytics"],

  endpoints: (builder) => ({
    // Fetch user data using the authentication cookie
    getUser: builder.query({
      query: () => "/getGlobalDataByCookie",
      transformResponse: (response) => response.result,
    }),

    // Fetch QR codes with filtering, sorting, pagination, and search
    getQRs: builder.query({
      query: ({ order, status, search, sort }) =>
        `/fetchAllQr?order=${order}&status=${status}&search=${search}&sort=${sort}`,
      transformResponse: (response) => response.data,
      providesTags: ["getAllQrs"],
    }),

    // Fetch a single QR code by its short code
    getQR: builder.query({
      query: (shortCode) => `/fetchQr/${shortCode}`,
      transformResponse: (response) => response.data,
      providesTags: ["getQR"],
    }),

    // Fetch analytics data for a QR code
    getAnalytics: builder.query({
      query: (_id) => `/fetchAnalytic/${_id}`,
      transformResponse: (response) => response.data,
      providesTags: ["getAnalytics"],
    }),

    // Delete a single QR code
    deleteQR: builder.mutation({
      query: (shortCode) => ({
        url: `/deleteQR/${shortCode}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getAllQrs"],
    }),

    // Delete multiple QR codes at once
    deleteQRs: builder.mutation({
      query: ({ shortCodes }) => ({
        url: `/deleteQRs`,
        method: "DELETE",
        body: { shortCodes },
      }),
      invalidatesTags: ["getAllQrs", "getQR", "getAnalytics"],
    }),

    // Update an existing QR code
    updateQR: builder.mutation({
      query: ({ shortCode, ...values }) => ({
        url: `/updateQR/${shortCode}`,
        method: "PATCH",
        body: values,
      }),
      invalidatesTags: ["getAllQrs", "getQR", "getAnalytics"],
    }),

    // Create a single QR code
    createQR: builder.mutation({
      query: (values) => ({
        url: `/createQR`,
        method: "POST",
        body: values,
      }),
      transformResponse: (response) => response.result,
      invalidatesTags: ["getAllQrs"],
    }),

    // Create multiple QR codes at once
    createQRs: builder.mutation({
      query: ({ qr }) => ({
        url: `/createQRs`,
        method: "POST",
        body: { qr },
      }),
      invalidatesTags: ["getAllQrs"],
    }),

    // Delete all QR codes for the current user
    deleteAllQrs: builder.mutation({
      query: () => ({
        url: "/deleteAllQrs",
        method: "DELETE",
      }),
      invalidatesTags: ["getAllQrs", "getQR", "getAnalytics"],
    }),
  }),
});

export const {
  useGetQRQuery,
  useGetUserQuery,
  useGetAnalyticsQuery,
  useGetQRsQuery,
  useDeleteQRMutation,
  useUpdateQRMutation,
  useCreateQRMutation,
  useDeleteQRsMutation,
  useCreateQRsMutation,
  useDeleteAllQrsMutation,
} = qrApi;
