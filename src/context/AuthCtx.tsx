import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";

import { getRoleFromToken } from "../utils/jwtUtils";
import { getCookie } from "../utils/cookieUtils";

export interface LoginData {
  accessToken: string;
  refreshToken: string;
}

export interface AuthContextType {
  login: (data: LoginData) => void;
  logout: () => void;
  role: string | null;
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

  useEffect(() => {
    if (location.pathname === "/adminpanel") {
      if (role !== "admin") {
        console.log("redirecting to /");
        navigate("/login");
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
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
