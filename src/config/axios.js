import axios from "axios";
import config from "./config";
const axiosApi = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true,
  timeout: 15000,
});

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    let normalized = {
      status: "Unknown",
      message: "Something went wrong. Please try again.",
    };
    let toastId = "api-error";

    if (!navigator.onLine) {
      normalized = {
        status: "Connection Failed",
        message:
          "Unable to connect. Please check your internet connection and try again.",
      };
      toastId = "offline";
    } else if (error.code === "ECONNABORTED") {
      normalized = {
        status: "Request Timed Out",
        message: "The server took too long to respond. Please try again.",
      };
      toastId = "timeout";
    } else if (error.code === "ERR_NETWORK" || !error.response) {
      normalized = {
        status: "Connection Failed",
        message:
          "Unable to connect. Please check your internet connection and try again.",
      };
      toastId = "offline";
    } else {
      normalized = {
        status: error.response.data.status,
        code: error.response.status,
        message: error.response.data?.message,
      };
    }
    console.log("Axios", error);
    if (normalized.status === 401) {
      localStorage.setItem("isAuthenticated", false);
      localStorage.setItem("user", null);
    }

    return Promise.reject(normalized);
  },
);

export default axiosApi;
