import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Automatically redirect to login if token is expired or unauthorized
api.interceptors.response.use(
  (response) => {
    const method = response.config.method?.toUpperCase();
    if (method && ["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
      try {
        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith("cache_")) {
            localStorage.removeItem(key);
          }
        });
      } catch (e) {
        console.error("Failed to clear localStorage cache:", e);
      }
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      if (window.location.pathname.includes("/admin")) {
        localStorage.clear();
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
