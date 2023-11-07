import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
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

  const [accessToken, setAccessToken] = useState<string | null>(
    cookies.accessToken || null,
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    cookies.refreshToken || null,
  );

  const navigate = useNavigate();
  const location = useLocation();

  const login = (data: LoginData) => {
    console.log("login successful", data);
    setCookie("accessToken", data.accessToken);
    setCookie("refreshToken", data.refreshToken);
    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);

    navigate("/");
  };

  const logout = () => {
    removeCookie("accessToken");
    removeCookie("refreshToken");
    setAccessToken(null);
    setRefreshToken(null);
    navigate("/login");
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
          } else {
            setAccessToken(null);
          }
        })
        .catch((error) => {
          console.error("Token is not valid: ", error);
          setAccessToken(null);
        });
    };

    notAuthenticated();
  }, [navigate, location, accessToken]);

  //USE EFFECT TO REFRESH TOKEN
  useEffect(() => {
    console.log("USE EFFECT TO REFRESH TOKEN");
    if (accessToken === null) {
      fetch("http://localhost:3000/api/identity/refresh", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + refreshToken,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            logout();
            throw new Error("Failed to refresh token");
          }
        })
        .then((data) => {
          setAccessToken(data.accessToken);
        })
        .catch((error) => {
          console.error("Token refresh failed: ", error);
          logout();
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

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
