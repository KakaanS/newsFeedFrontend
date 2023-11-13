import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../middleware/api";

import { getRoleFromToken } from "../utils/jwtUtils";
import openApi from "../middleware/openApi";
import { getCookie } from "../utils/cookieUtils";

export interface LoginData {
  accessToken: string;
  refreshToken: string;
}

export interface AuthContextType {
  login: (data: LoginData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [, setCookie, removeCookie] = useCookies([
    "accessToken",
    "refreshToken",
  ]);
  const [role, setRole] = useState<string | null>(
    getRoleFromToken(getCookie("accessToken") || ""),
  );

  const navigate = useNavigate();
  const location = useLocation();

  const login = (data: LoginData) => {
    setCookie("accessToken", data.accessToken);
    setCookie("refreshToken", data.refreshToken);
    navigate("/");
    setRole(getRoleFromToken(data.accessToken));
  };

  const logout = () => {
    removeCookie("refreshToken");
    removeCookie("accessToken");
    setRole(null);
    navigate("/login");
  };

  const refreshAccessToken = async (
    refreshToken: string | null,
  ): Promise<string | undefined> => {
    console.log("refreshAccessToken - Entering");
    console.log("refreshAccessToken refreshToken: ", refreshToken);
    if (refreshToken) {
      try {
        console.log("refreshAccessToken - checking");
        const response = await openApi.get("/identity/refresh", {
          headers: {
            Authorization: "Bearer " + refreshToken,
          },
        });
        console.log("refreshAccessToken - response: ", response);

        if (response.status === 200) {
          console.log("refreshAccessToken - refreshToken is valid");
          const accessToken = response.data.accessToken;
          setCookie("accessToken", accessToken);
          navigate(location.pathname);
          return accessToken;
        }
      } catch (error) {
        console.log(
          "refreshAccessToken - not ok \n\t - ",
          (error as Error)?.message,
        );
        console.log(error);
        logout();
      }
    } else {
      return undefined;
    }
  };

  const isAccessTokenValid = async (
    accessToken: string | null,
  ): Promise<boolean | undefined> => {
    console.log("isAccessTokenValid accessToken: ", accessToken);
    if (accessToken) {
      try {
        console.log("isAccessTokenValid - checking");
        const response = await openApi.get("/identity/verifyToken", {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        });

        if (response.status === 200) {
          console.log("verifyAccessToken - accessToken is valid");
          setRole(getRoleFromToken(accessToken));
          return true;
        }
      } catch (error) {
        console.log(
          "verifyAccessToken - not ok \n\t - ",
          (error as Error)?.message,
        );
        removeCookie("accessToken");
        return false;
      }
    } else {
      return false;
    }
  };
  // const interceptor =
  // ^om man vill använda eject igen
  let refreshTokenPromise: Promise<string | undefined> | null = null;
  api.interceptors.request.use(
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
      //api.interceptors.request.eject(interceptor);
      return request;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  useEffect(() => {
    if (location.pathname === "/adminpanel") {
      if (role !== "admin") {
        console.log("redirecting to /");
        navigate("/");
      }
    }
  }, [navigate, location.pathname, role]);

  return (
    <AuthContext.Provider
      value={
        {
          login,
          logout,
          role,
        } as AuthContextType
      }
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
