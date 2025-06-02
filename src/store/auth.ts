import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";

interface AuthStore {
  token: string | null;
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
  setToken: (token: string) => void;
  logout: () => void;
}

const url = process.env.NEXT_PUBLIC_API_URL;

export const useAuthStore = create<AuthStore>((set) => ({
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  loading: false,
  error: null,

  setToken: (token) => {
    localStorage.setItem("token", token);
    Cookies.set("token", token);
    set({ token });
  },

  login: async ({ usernameOrEmail, password }) => {
    try {
      const response = await axios.post(`${url}/login`, {
        usernameOrEmail,
        password,
      });

      const { access } = response.data.data as AuthData;

      localStorage.setItem("token", access);
      Cookies.set("token", access);

      set({ token: access });
    } catch (error: any) {
      const message = error?.response?.data?.message || "Login failed";
      throw new Error(message);
    }
  },

  register: async ({ fullname, username, email, password }) => {
    try {
      set({ loading: true, error: null });
      await axios.post(`${url}/register`, {
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
    localStorage.removeItem("token");
    Cookies.remove("token");
    set({ token: null });
  },
}));
