import axios from "axios";

const refreshAccessToken = async (refreshToken: string): Promise<string | null> => {
  const baseURL = import.meta.env.VITE_BACKEND_API_BASE_URL as string


  try {
    const response = await axios.post(`${baseURL}/auth/refreshToken`, {
      refreshToken: refreshToken,
    });

    if (response.data.status === 1) {
      const { accessToken } = response.data.data;
      localStorage.setItem("t", accessToken);
      return accessToken;
    } else {
      console.error("Error refreshing token:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error during refresh token request:", error);
    return null;
  }
};

export default refreshAccessToken;
