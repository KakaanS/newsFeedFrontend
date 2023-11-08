import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role: string;
  // include other properties as needed
}

export const getRoleFromToken = (token: string) => {
  if (token) {
    const decodedToken = jwtDecode(token) as DecodedToken;
    return decodedToken.role;
  }
  return null;
};
