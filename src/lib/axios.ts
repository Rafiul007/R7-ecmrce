import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/* =====================================================
   Refresh handling state
===================================================== */

let isRefreshing = false;

type FailedRequestQueueItem = {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
};

let failedQueue: FailedRequestQueueItem[] = [];

const processQueue = (error?: unknown) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });
  failedQueue = [];
};

/* =====================================================
   Request interceptor (noop for cookie auth)
===================================================== */

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 🔒 No access token handling here
    // Cookies are sent automatically
    return config;
  },
  (error) => Promise.reject(error)
);

/* =====================================================
   Response interceptor (refresh token logic)
===================================================== */

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // If no response or not 401 → just reject
    if (!error.response || error.response.status !== 401) {
      return Promise.reject(error);
    }

    // Prevent infinite refresh loop
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // If refresh already in progress, queue request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(() => api(originalRequest));
    }

    isRefreshing = true;

    try {
      // 🔁 Call refresh endpoint
      await api.post("/auth/refresh"); // Adjust endpoint as needed for refresh token.

      // Retry all queued requests
      processQueue();

      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);

      // ❌ Refresh failed → user is logged out
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);
