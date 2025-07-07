"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { refreshToken } from "@/lib/refreshToken";
import { useAuthStore } from "@/store/auth";

export default function TokenRefresher() {
  const setToken = useAuthStore((state) => state.setToken);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const didLogout = sessionStorage.getItem("logout") === "true";
    if (didLogout) return;

    const access = Cookies.get("access");
    if (!access) {
      refreshToken().then((newToken) => {
        if (newToken) {
          sessionStorage.removeItem("logout");
          setToken(newToken, Cookies.get("refresh") || "");
        } else {
          logout();
        }
      });
    }
  }, [setToken, logout]);

  return null;
}
