import axios from "axios";
import refreshAccessToken from "./refreshToken";

const baseURL = import.meta.env.VITE_BACKEND_API_BASE_URL as string

const AppBackendApi = axios.create({
  baseURL,
});

// auto refresh token when return 401 from api calls
AppBackendApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("rt");
      if (refreshToken) {
        const newAccessToken = await refreshAccessToken(refreshToken);

        if (!newAccessToken) {
          return Promise.reject(error);
        }

        // update the token in local storage and axios headers
        AppBackendApi.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // retry the original request
        return AppBackendApi(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default AppBackendApi;
