// Tools
import axios from "axios";

// Content
import { getCookie } from "../utils/cookieUtils";
import { isAccessTokenValid, refreshAccessToken } from "../utils/AuthHelper";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

let refreshTokenPromise: Promise<string | undefined> | null = null;
export const interceptor = api.interceptors.request.use(
  async (request) => {
    const accessToken = getCookie("accessToken") || "";
    const refreshToken = getCookie("refreshToken") || "";

    if ((await isAccessTokenValid(accessToken)) === false) {
      if (refreshTokenPromise === null) {
        refreshTokenPromise = refreshAccessToken(refreshToken).finally(() => {
          //finally resetting the promise allows subsequent requests to proceed normally
          refreshTokenPromise = null;
        });
      }

      const newToken = await refreshTokenPromise;

      request.headers.Authorization = `Bearer ${newToken}`;
    } else {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }
    // api.interceptors.request.eject(interceptor);
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getCookie("refreshToken") || "";
      const newToken = await refreshAccessToken(refreshToken);
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return api(originalRequest);
    }
    return Promise.reject(error);
  },
);

export default api;
