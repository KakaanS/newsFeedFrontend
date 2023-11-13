// AuthHelper.ts
import openApi from "../middleware/openApi";

export const refreshAccessToken = async (
  refreshToken: string | null,
): Promise<string | undefined> => {
  if (refreshToken) {
    try {
      const response = await openApi.get("/identity/refresh", {
        headers: {
          Authorization: "Bearer " + refreshToken,
        },
      });

      if (response.status === 200) {
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
  if (accessToken) {
    try {
      const response = await openApi.get("/identity/verifyToken", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });

      if (response.status === 200) {
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
