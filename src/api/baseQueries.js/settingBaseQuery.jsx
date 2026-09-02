import CustomToast from "@/components/UI/CustomToast";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import config from "./../../config/config";

// Common API configuration
const baseQuery = fetchBaseQuery({
  baseUrl: config.baseUrl,
  credentials: "include",
  timeout: 10000,
});

export const settingBaseQuery = async (args, api, extraOptions) => {
  // Handle offline state
  if (!navigator.onLine) {
    toast.custom(
      <CustomToast type="error" description="Connection Problem!" />,
      {
        id: "offline",
      },
    );

    return {
      error: {
        status: "Connection Failed",
        message:
          "Unable to connect. Please check your internet connection and try again.",
      },
    };
  }

  const result = await baseQuery(args, api, extraOptions);

  // Handle request errors
  switch (result.error?.status) {
    case "TIMEOUT_ERROR":
      toast.custom(
        <CustomToast type="error" description="Connection Problem!" />,
        {
          id: "timeout",
        },
      );

      return {
        error: {
          status: "Request Timed Out",
          message: "The server took too long to respond. Please try again.",
        },
      };

    case "FETCH_ERROR":
      toast.custom(
        <CustomToast type="error" description="Connection Problem!" />,
        {
          id: "offline",
        },
      );

      return {
        error: {
          status: "Connection Failed",
          message:
            "Unable to connect. Please check your internet connection and try again.",
        },
      };

    default:
      // Handle server errors
      if (result.error) {
        toast.custom(
          <CustomToast
            type="error"
            description={result?.error?.data?.message}
          />,
          { id: "api-error" },
        );
      }
  }

  const { status } = { ...result?.error };

  // Logout on unauthorized response
  if (status === 401) {
    localStorage.setItem("isAuthenticated", false);
    localStorage.setItem("user", null);
    window.location.replace("/");
  }

  // Return data on success or error on failure
  return result;
};
