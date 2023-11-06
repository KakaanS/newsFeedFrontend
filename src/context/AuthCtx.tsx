import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

interface AccessToken {
  expires: string;
}

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState<AccessToken | null>(null);
  const [refreshToken, setRefreshToken] = useState(null);

  const login = (data) => {
    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
  };

  useEffect(() => {
    const isAccessTokenExpired =
      accessToken && new Date(accessToken.expires) < new Date();

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

export const useAuth = () => {
  return useContext(AuthContext);
};
