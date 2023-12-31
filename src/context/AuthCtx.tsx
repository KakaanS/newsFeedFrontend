import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";

import { getRoleFromToken, getUserIdFromToken } from "../utils/jwtUtils";
import { getCookie } from "../utils/cookieUtils";
import { isAccessTokenValid, refreshAccessToken } from "../utils/AuthHelper";
import api from "../middleware/api";

export type TypeUser = {
  user_id: string;
  username: string;
  email: string;
  created_at: string;
  edited_at: string;
};

export interface LoginData {
  accessToken: string;
  refreshToken: string;
  user: TypeUser;
}

export interface AuthContextType {
  login: (data: LoginData) => void;
  logout: () => void;
  role: string | null;
  userId: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "refreshToken",
  ]);
  const [role, setRole] = useState<string | null>(
    getRoleFromToken(getCookie("accessToken") || ""),
  );
  const [userId, setUserId] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const login = (data: LoginData) => {
    setCookie("accessToken", data.accessToken);
    setCookie("refreshToken", data.refreshToken);
    navigate("/");
    setRole(getRoleFromToken(data.accessToken));
    setUserId(data.user.user_id);
  };

  const logout = async () => {
    await api.get("/identity/logout");

    removeCookie("refreshToken");
    removeCookie("accessToken");
    setRole(null);
    navigate("/login");
  };

  useEffect(() => {
    isAccessTokenValid(cookies.accessToken)
      .then((res) => {
        setUserId(getUserIdFromToken(cookies.accessToken));
        if (res === false) {
          refreshAccessToken(cookies.refreshToken)
            .then((newToken) => {
              if (newToken) {
                setCookie("accessToken", newToken);
                setRole(getRoleFromToken(newToken));
              }
            })
            .catch(() => {
              logout();
            });
        }
      })
      .catch((err) => {
        console.error(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies.accessToken, cookies.refreshToken]);

  useEffect(() => {
    if (location.pathname === "/adminpanel") {
      if (role !== "admin") {
        navigate("/");
      }
    } else if (
      location.pathname !== "/login" &&
      location.pathname !== "/register" &&
      location.pathname !== "/resetPassword"
    ) {
      if (role !== "user" && role !== "admin") {
        navigate("/login");
      }
    } else if (
      location.pathname === "/login" ||
      location.pathname === "/register" ||
      location.pathname === "/resetPassword"
    ) {
      if (role === "user" || role === "admin") {
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
          userId,
        } as AuthContextType
      }
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
