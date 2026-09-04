"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usersApi } from "@/lib/api/users";
import { useAuthStore } from "@/lib/store/auth-store";

export default function ArtisanRouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setUser = useAuthStore((state) => state.setUser);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;

    async function verifyAccess() {
      try {
        const response = await usersApi.getProfile();
        const profile = response.data;

        const role = String(profile.role ?? "").toLowerCase();

        if (role !== "artisan") {
          router.replace("/");
          return;
        }

        setUser({
          id: String(profile.id),
          name: profile.name ?? profile.full_name ?? "",
          email: profile.email ?? "",
          role: profile.role,
        });

        if (active) {
          setChecking(false);
        }
      } catch {
        if (active) {
          router.replace(
            `/artisan/login?redirect=${encodeURIComponent(
              window.location.pathname
            )}`
          );
        }
      }
    }

    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;

    if (!isAuthenticated && !token) {
      router.replace(
        `/artisan/login?redirect=${encodeURIComponent(
          window.location.pathname
        )}`
      );
      return;
    }

    verifyAccess();

    return () => {
      active = false;
    };
  }, [isAuthenticated, router, setUser]);

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f0df] text-[#351716]">
        <div className="rounded-2xl border border-[#c9a45c]/30 bg-[#fbf7ed] px-8 py-7 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#d8c9ad] border-t-[#641f20]" />

          <p className="mt-4 font-serif text-lg font-semibold text-[#531c1d]">
            Opening Artisan Studio...
          </p>

          <p className="mt-1 text-sm text-[#806b5d]">
            Verifying your artisan account.
          </p>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}