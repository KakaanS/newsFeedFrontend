import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role: string;
  user_id: string;
}

export const getRoleFromToken = (token: string) => {
  if (token) {
    const decodedToken = jwtDecode(token) as DecodedToken;
    return decodedToken.role;
  }
  return null;
};

export const getUserIdFromToken = (token: string) => {
  if (token) {
    const decodedToken = jwtDecode(token) as DecodedToken;
    return decodedToken.user_id;
  }
  return null;
};
