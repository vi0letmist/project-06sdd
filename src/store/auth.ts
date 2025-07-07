import { create } from "zustand";
import Cookies from "js-cookie";
import { decodeJWT } from "@/lib/decodeJWT";
import axiosClient from "@/lib/axiosClient";

interface AuthStore {
  token: string | null;
  userData: Record<string, any> | null;
  loading: boolean;
  error: string | null;
  login: (credentials: {
    usernameOrEmail: string;
    password: string;
  }) => Promise<void>;
  register: (form: {
    fullname: string;
    username: string;
    email: string;
    password: string;
  }) => Promise<void>;
  setToken: (token: string, refresh: string) => void;
  logout: () => void;
}

const url = process.env.NEXT_PUBLIC_API_URL;
const tokenFromStorage =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;
const hydratedUserData = tokenFromStorage ? decodeJWT(tokenFromStorage) : null;

export const useAuthStore = create<AuthStore>((set, get) => ({
  token: tokenFromStorage,
  userData: hydratedUserData,
  loading: false,
  error: null,

  setToken: (access, refresh) => {
    const userData = decodeJWT(access);

    localStorage.setItem("token", access);
    Cookies.set("access", access, { expires: 1 / 24 });
    Cookies.set("refresh", refresh, { expires: 7 });

    set({ token: access, userData });
  },

  login: async ({ usernameOrEmail, password }) => {
    try {
      const response = await axiosClient.post(`${url}/login`, {
        usernameOrEmail,
        password,
      });

      const { access, refresh } = response.data.data as AuthData;

      get().setToken(access, refresh);
    } catch (error: any) {
      const message = error?.response?.data?.message || "Login failed";
      throw new Error(message);
    }
  },

  register: async ({ fullname, username, email, password }) => {
    try {
      set({ loading: true, error: null });
      await axiosClient.post(`${url}/register`, {
        fullname,
        username,
        email,
        password,
      });
      set({ loading: false });
    } catch (error: any) {
      set({
        loading: false,
        error: error.response?.data?.message || error.message,
      });
    }
  },

  logout: () => {
    sessionStorage.setItem("logout", "true");
    Cookies.remove("access");
    Cookies.remove("refresh");
    localStorage.removeItem("token");
    set({ token: "", userData: null });
    window.location.reload();
  },
}));
