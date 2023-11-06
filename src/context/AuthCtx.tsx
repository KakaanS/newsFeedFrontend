import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface AccessToken {
  expires: string;
}
export interface LoginData {
  accessToken: AccessToken;
  refreshToken: string;
}
interface AuthContextType {
  accessToken: AccessToken | null;
  refreshToken: string | null;
  login: (data: LoginData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<AccessToken | null>(null); // needs to be AccessToken to handle ".expires" in isAccessTokenExpired
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const login = (data: LoginData) => {
    console.log("login successful", data);
    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
  };

  useEffect(() => {
    const isAccessTokenExpired =
      accessToken && new Date(accessToken.expires) <= new Date();

    if (isAccessTokenExpired) {
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
  }, [accessToken, refreshToken]);

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
