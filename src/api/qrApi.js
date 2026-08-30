import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../config/config";
export const qrApi = createApi({
  reducerPath: "qrApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${config.baseUrl}/data`,
    credentials: "include",
  }),
  tagTypes: ["getAllQrs", "getQR", "getAnalytics"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "/getGlobalDataByCookie",
      transformResponse: (response) => {
        return response.result;
      },
    }),
    getQRs: builder.query({
      query: ({ order, status, page, search, limit }) =>
        `/fetchAllQr?order=${order}&status=${status}&page=${page}&search=${search}&limit=${limit}`,
      transformResponse: (response) => {
        return response.data;
      },
      providesTags: ["getAllQrs"],
    }),
    getQR: builder.query({
      query: (shortCode) => `/fetchQr/${shortCode}`,
      transformResponse: (response) => {
        return response.data;
      },
      providesTags: ["getQR"],
    }),
    getAnalytics: builder.query({
      query: (_id) => `/fetchAnalytic/${_id}`,
      transformResponse: (response) => {
        return response.data;
      },
      providesTags: ["getAnalytics"],
    }),
    deleteQR: builder.mutation({
      query: (shortCode) => ({
        url: `/deleteQR/${shortCode}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getAllQrs", "getQR", "getAnalytics"],
    }),
    deleteQRs: builder.mutation({
      query: ({ shortCodes }) => ({
        url: `/deleteQRs`,
        method: "DELETE",
        body: { shortCodes },
      }),
      invalidatesTags: ["getAllQrs", "getQR", "getAnalytics"],
    }),
    updateQR: builder.mutation({
      query: ({ shortCode, ...values }) => ({
        url: `/updateQR/${shortCode}`,
        method: "PATCH",
        body: values,
      }),
      invalidatesTags: ["getAllQrs", "getQR", "getAnalytics"],
    }),
    createQR: builder.mutation({
      query: (values) => ({
        url: `/createQR`,
        method: "POST",
        body: values,
      }),
      transformResponse: (response) => response.result,
      invalidatesTags: ["getAllQrs"],
    }),
    createQRs: builder.mutation({
      query: ({ qr }) => ({
        url: `/createQRs`,
        method: "POST",
        body: { qr },
      }),
      invalidatesTags: ["getAllQrs"],
    }),
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
