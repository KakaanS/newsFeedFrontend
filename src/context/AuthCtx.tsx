import { createContext, useContext, useEffect, ReactNode } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";

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

  const handleRefreshToken = () => {
    if (refreshToken !== null) {
      fetch("http://localhost:3000/api/identity/refresh", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + refreshToken,
        },
      })
        .then((response) => {
          console.log("response", response);
          if (response.ok) {
            return response.json();
          } else {
            logout();
            throw new Error("Failed to refresh token");
          }
        })
        .then((data) => {
          console.log("data", data);
          setCookie("accessToken", data.accessToken);
        })
        .catch((error) => {
          console.error("Token refresh failed: ", error);
          logout();
        });
    }
  };

  //USE EFFECT TO CHECK IF TOKEN IS VALID
  useEffect(() => {
    console.log("USE EFFECT TO CHECK IF TOKEN IS VALID");

    const notAuthenticated = () => {
      fetch("http://localhost:3000/api/identity/verifyToken", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
        .then((response) => {
          if (response.ok) {
            return true;
          } else if (response.status === 401) {
            removeCookie("accessToken");
            handleRefreshToken();
          } else {
            logout();
            throw new Error("Token is not valid");
          }
        })
        .catch((error) => {
          console.error("Something went wrong", error);
          logout();
        });
    };

    notAuthenticated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, location.pathname, accessToken]);

  useEffect(() => {
    if (refreshToken === null) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, location.pathname]);

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
