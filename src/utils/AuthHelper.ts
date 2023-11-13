// AuthHelper.ts
import openApi from "../middleware/openApi";

export const refreshAccessToken = async (
  refreshToken: string | null,
): Promise<string | undefined> => {
  console.log("refreshAccessToken - Entering");
  console.log("refreshAccessToken refreshToken: ", refreshToken);
  if (refreshToken) {
    try {
      console.log("refreshAccessToken - checking");
      const response = await openApi.get("/identity/refresh", {
        headers: {
          Authorization: "Bearer " + refreshToken,
        },
      });
      console.log("refreshAccessToken - response: ", response);

      if (response.status === 200) {
        console.log("refreshAccessToken - refreshToken is valid");
        const accessToken = response.data.accessToken;
        return accessToken;
      }
    } catch (error) {
      console.log(
        "refreshAccessToken - not ok \n\t - ",
        (error as Error)?.message,
      );
      console.log(error);
      throw error;
    }
  } else {
    return undefined;
  }
};

export const isAccessTokenValid = async (
  accessToken: string | null,
): Promise<boolean> => {
  console.log("isAccessTokenValid accessToken: ", accessToken);
  if (accessToken) {
    try {
      console.log("isAccessTokenValid - checking");
      const response = await openApi.get("/identity/verifyToken", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });

      if (response.status === 200) {
        console.log("verifyAccessToken - accessToken is valid");
        return true;
      }
    } catch (error) {
      console.log(
        "verifyAccessToken - not ok \n\t - ",
        (error as Error)?.message,
      );
      return false;
    }
  }
  return false;
};
