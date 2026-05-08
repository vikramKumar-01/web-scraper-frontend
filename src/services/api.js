import axios from "axios";

const fallbackApiUrl = "http://localhost:4500/api";

function resolveBaseUrl() {
  const configuredUrl = import.meta.env.VITE_API_URL?.trim();
  return configuredUrl || fallbackApiUrl;
}

const apiClient = axios.create({
  baseURL: resolveBaseUrl(),
  timeout: 15000
});

let authToken = null;

apiClient.interceptors.request.use(
  (config) => {
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const isNetworkError = !error.response;
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      (isNetworkError
        ? `Unable to reach the backend at ${resolveBaseUrl()}. Confirm the API server is running and VITE_API_URL is correct.`
        : error.message) ||
      "Something went wrong. Please try again.";

    return Promise.reject({
      ...error,
      message,
      status: error.response?.status,
      isNetworkError,
      baseURL: resolveBaseUrl()
    });
  }
);

const api = {
  get: (...args) => apiClient.get(...args),
  post: (...args) => apiClient.post(...args),
  delete: (...args) => apiClient.delete(...args),
  getBaseUrl: () => resolveBaseUrl(),
  setAuthToken: (token) => {
    authToken = token;
  }
};

export default api;
