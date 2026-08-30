import axiosApi from "@/config/axios";
import { useEffect, useState } from "react";

const useInternetStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const checkInternetConnection = async () => {
    if (!navigator.onLine) {
      setIsOnline(false);
      return;
    }

    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 3000);

    try {
      const response = await axiosApi.get("/health", {
        timeout: 3000,
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      setIsOnline(response.status === 200);
    } catch (err) {
      setIsOnline(false);
    } finally {
      clearTimeout(timeoutId);
    }
  };

  useEffect(() => {
    const handleOffline = () => {
      setIsOnline(false);
    };

    const handleOnline = () => {
      checkInternetConnection();
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    checkInternetConnection();

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return {
    isOnline,
  };
};

export default useInternetStatus;
