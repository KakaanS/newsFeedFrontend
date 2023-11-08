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
import { getRoleFromToken } from "../utils/jwtUtils";
export interface LoginData {
  accessToken: string;
  refreshToken: string;
}
interface AuthContextType {
  login: (data: LoginData) => void;
  logout: () => void;
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

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (!cookies.refreshToken) {
        logout();
      } else if (error.response.status === 401) {
        const responseData = error.response.data;
        if (responseData.error === "Token not authorized") {
          handleRefreshToken();
        }
      }
      return Promise.reject(error);
    },
  );

  const handleRefreshToken = async () => {
    if (cookies.refreshToken) {
      try {
        const response = await api.get("/identity/refresh", {
          headers: {
            Authorization: "Bearer " + cookies.refreshToken,
          },
        });

        if (response.status === 200) {
          setCookie("accessToken", response.data.accessToken);
        } else {
          logout();
          throw new Error("Failed to refresh token");
        }
      } catch (error) {
        if ((error as AxiosError)?.response?.status === 401) {
          logout();
          return;
        }
        console.error(error);
      }
    } else {
      logout();
    }
  };

  useEffect(() => {
    const handleAccessToken = async () => {
      if (!cookies.accessToken && !cookies.refreshToken) return;
      try {
        const response = await api.get("/identity/verifyToken", {
          headers: {
            Authorization: "Bearer " + cookies.accessToken,
          },
        });

        if (response.status === 200) {
          console.log("Token is valid");
          setRole(getRoleFromToken(cookies.accessToken));
          return true;
        } else {
          logout();
          throw new Error("Token is not valid");
        }
      } catch (error) {
        if ((error as AxiosError)?.response?.status === 401) return;
        console.error(error);
      }
    };

    handleAccessToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, location.pathname]);

  useEffect(() => {
    if (!cookies.refreshToken) {
      removeCookie("accessToken");
      if (location.pathname === "/register") return;
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, location.pathname, cookies.accessToken, cookies.refreshToken]);

  const value = {
    login,
    logout,
    role,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
