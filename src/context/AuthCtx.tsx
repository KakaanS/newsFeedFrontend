import { createContext, useContext, useEffect, ReactNode } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import api from "../middleware/api";
export interface LoginData {
  accessToken: string;
  refreshToken: string;
}
interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (data: LoginData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "refreshToken",
  ]);

  const accessToken = cookies.accessToken || null;
  const refreshToken = cookies.refreshToken || null;

  const navigate = useNavigate();
  const location = useLocation();

  const login = (data: LoginData) => {
    setCookie("accessToken", data.accessToken);
    setCookie("refreshToken", data.refreshToken);
    navigate("/");
  };

  const logout = () => {
    removeCookie("refreshToken");
    removeCookie("accessToken");
    navigate("/login");
  };

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        const responseData = error.response.data;
        if (responseData.error === "Token not authorized") {
          handleRefreshToken();
        }
      }
      return Promise.reject(error);
    },
  );

  const handleRefreshToken = async () => {
    if (refreshToken !== null) {
      try {
        const response = await api.get("/identity/refresh", {
          headers: {
            Authorization: "Bearer " + refreshToken,
          },
        });

        if (response.status === 200) {
          setCookie("accessToken", response.data.accessToken);
        } else {
          logout();
          throw new Error("Failed to refresh token");
        }
      } catch (error) {
        console.error("Token refresh failed: ", error);
        logout();
      }
    }
  };

  useEffect(() => {
    const notAuthenticated = async () => {
      try {
        const response = await api.get("/identity/verifyToken", {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        });

        if (response.status === 200) {
          console.log("Token is valid");
          return true;
        } else if (response.status === 401) {
          removeCookie("accessToken");
          handleRefreshToken();
        } else {
          logout();
          throw new Error("Token is not valid");
        }
      } catch (error) {
        if ((error as AxiosError)?.response?.status === 401) return;
        console.error(error);
      }
    };

    notAuthenticated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, location.pathname, accessToken]);

  useEffect(() => {
    if (refreshToken === null) {
      removeCookie("accessToken");
      if (location.pathname === "/register") return;
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, location.pathname, refreshToken]);

  const value = {
    accessToken,
    refreshToken,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
