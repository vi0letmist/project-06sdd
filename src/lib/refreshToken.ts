import axios from "axios";
import Cookies from "js-cookie";

const url = process.env.NEXT_PUBLIC_API_URL;

export const refreshToken = async () => {
  try {
    const refresh = Cookies.get("refresh");
    if (!refresh) return null;

    const response = await axios.post(`${url}/token/refresh/`, { refresh });
    const newAccess = response.data.access;
    console.log("New access token:", newAccess);

    Cookies.set("access", newAccess, { expires: 1 / 24 });
    return newAccess;
  } catch (err) {
    console.error("Refresh token failed", err);
    return null;
  }
};
