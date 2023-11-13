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

    console.log("INTERCEPTOR: requested url: ", request.url);
    if ((await isAccessTokenValid(accessToken)) === false) {
      console.log("INTERCEPTOR: - accessToken not valid");
      if (refreshTokenPromise === null) {
        console.log("INTERCEPTOR: running refreshAccessToken");
        refreshTokenPromise = refreshAccessToken(refreshToken).finally(() => {
          //finally resetting the promise allows subsequent requests to proceed normally
          refreshTokenPromise = null;
        });
      }

      const newToken = await refreshTokenPromise;
      console.log("newToken: ", newToken);
      request.headers.Authorization = `Bearer ${newToken}`;
    } else {
      console.log("INTERCEPTOR: - accessToken valid");
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
    console.log("INTERCEPTOR22: response: ", response);
    return response;
  },
  async (error) => {
    console.log("INTERCEPTOR22: error: ", error);
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
