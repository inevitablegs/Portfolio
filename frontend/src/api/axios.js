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

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

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
  async (error) => {
    const originalRequest = error.config;

    // Avoid infinite loop if the refresh request itself fails with 401
    if (originalRequest.url && originalRequest.url.includes("/token/refresh/")) {
      if (window.location.pathname.includes("/admin")) {
        localStorage.clear();
        window.location.href = "/admin/login";
      }
      return Promise.reject(error);
    }

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh");

      if (refreshToken) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return api(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        isRefreshing = true;

        try {
          const res = await axios.post(`${import.meta.env.VITE_API_URL}/token/refresh/`, {
            refresh: refreshToken,
          });

          const newAccessToken = res.data.access;
          localStorage.setItem("access", newAccessToken);

          api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          processQueue(null, newAccessToken);
          isRefreshing = false;

          return api(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          isRefreshing = false;

          if (window.location.pathname.includes("/admin")) {
            localStorage.clear();
            window.location.href = "/admin/login";
          }
          return Promise.reject(refreshError);
        }
      } else {
        if (window.location.pathname.includes("/admin")) {
          localStorage.clear();
          window.location.href = "/admin/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
