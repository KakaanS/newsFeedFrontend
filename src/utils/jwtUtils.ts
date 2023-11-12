import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role: string;
}

export const getRoleFromToken = (token: string) => {
  if (token) {
    const decodedToken = jwtDecode(token) as DecodedToken;
    return decodedToken.role;
  }
  return null;
};
