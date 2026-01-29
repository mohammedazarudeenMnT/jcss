import axios from "axios";

const getApiUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  if (typeof window !== "undefined") {
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) {
      return "http://localhost:5000";
    }
    return `${window.location.origin}/api`;
  }

  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
};

export const axiosInstance = axios.create({
  baseURL: getApiUrl(),
  withCredentials: true, // Crucial for session cookies
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      if (!window.location.pathname.includes("/login")) {
        // Optional: Redirect to login or handle session expiration
        // window.location.href = "/login";
      }
    }

    if (error.response?.status === 403 && typeof window !== "undefined") {
      console.warn("🔒 Access Denied (403):", error.response?.data);
      // Handle 403 globally if needed
    }

    return Promise.reject(error);
  },
);
