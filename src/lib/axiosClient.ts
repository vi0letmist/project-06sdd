import axios from "axios";
import Cookies from "js-cookie";
import { refreshToken } from "./refreshToken";

const axiosClient = axios.create();

axiosClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newToken = await refreshToken();
      if (newToken) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        return axiosClient(originalRequest);
      }
    }

    return Promise.reject(err);
  }
);

export default axiosClient;
