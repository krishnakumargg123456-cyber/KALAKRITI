"use client";

import { useEffect } from "react";
import { authApi } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/store/auth-store";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    async function restoreSession() {
      const token = localStorage.getItem("access_token");

      if (!token) {
        return;
      }

      try {
        const response = await authApi.me();

        if (response?.data) {
          setUser(response.data);
        }
      } catch {
        localStorage.removeItem("access_token");
        setUser(null);
      }
    }

    restoreSession();
  }, [setUser]);

  return <>{children}</>;
}
