import {
  createContext,
  useContext,
  useEffect,
  ReactNode,
  useState,
} from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import api from "../middleware/api";
import openApi from "../middleware/openApi";
import { getRoleFromToken } from "../utils/jwtUtils";

export interface LoginData {
  accessToken: string;
  refreshToken: string;
}

interface AuthContextType {
  login: (data: LoginData) => void;
  logout: () => void;
  accessToken: string | null;
  validToken: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "refreshToken",
  ]);
  const [role, setRole] = useState<string | null>(
    getRoleFromToken(cookies.accessToken),
  );
  const [validToken, setValidToken] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  const login = (data: LoginData) => {
    setCookie("accessToken", data.accessToken);
    setCookie("refreshToken", data.refreshToken);
    navigate("/");
    setRole(getRoleFromToken(data.accessToken));
    setValidToken(true);
  };

  const logout = () => {
    removeCookie("refreshToken");
    removeCookie("accessToken");
    setRole(null);
    setValidToken(false);
    navigate("/login");
  };
  console.log(cookies.refreshToken);
  console.log(cookies.accessToken);
  console.log("role, validtoken?", role, validToken);

  const handleRefreshToken = async () => {
    console.log(
      "COOKIES.REFRESHTOKEN, in handleResfresh: ",
      cookies.refreshToken,
    );
    if (cookies.refreshToken) {
      console.log("handleREFRESH, after cookies.refreshToken has been checked");
      try {
        const response = await api.get("/identity/refresh", {
          headers: {
            Authorization: "Bearer " + cookies.refreshToken,
          },
        });
        console.log("handleRefresh: response", response);
        if (response.status === 200) {
          const accessToken = response.data.accessToken;
          setCookie("accessToken", accessToken);
          setValidToken(true);
          console.log(
            "We should be setting accessToken and validToken here: ",
            accessToken,
            validToken,
          );
          return { accessToken: accessToken };
        }
      } catch (error) {
        if ((error as AxiosError)?.response?.status === 401) {
          logout();
          return;
        }
        console.log(error);
      }
    } else {
      console.log("handleRefresh: No refresh token found");
      logout();
      return;
    }
  };

  const handleAccessToken = async () => {
    if (!cookies.accessToken && !cookies.refreshToken) return;
    try {
      const response = await openApi.get("/identity/verifyToken", {
        headers: {
          Authorization: "Bearer " + cookies.accessToken,
        },
      });

      if (response.status === 200) {
        console.log("handleAccessToken: Token is valid");
        setRole(getRoleFromToken(cookies.accessToken));
        setValidToken(true);
        return true;
      } else {
        logout();
        throw new Error("Token is not valid");
      }
    } catch (error) {
      console.log("handleAccessToken: axios error triggering");
      if ((error as AxiosError)?.response?.status === 401) return;
      console.log(error);
    }
  };

  openApi.interceptors.response.use(
    async (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const response = await handleRefreshToken();
          if (response) {
            originalRequest.headers.Authorization =
              "Bearer " + response.accessToken;

            const retryResponse = await openApi(originalRequest);

            setCookie("accessToken", response.accessToken);

            return retryResponse;
          }
        } catch (error) {
          console.log(error);
        }
      }
      return Promise.reject(error);
    },
  );

  useEffect(() => {
    handleAccessToken();
    console.log("useEffectL", handleAccessToken());
    if (location.pathname === "/adminpanel") {
      if (role !== "admin") navigate("/");
    }
    if (!cookies.refreshToken) {
      removeCookie("accessToken");
      if (
        location.pathname === "/register" ||
        location.pathname === "/resetPassword"
      ) {
        return;
      }
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, location.pathname, cookies.accessToken, cookies.refreshToken]);

  const value = {
    login,
    logout,
    role,
    accessToken: cookies.accessToken,
    validToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
