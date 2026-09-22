"use client";

import { useLayoutEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/redux/store";
import { logout } from "@/app/redux/slices/authslice";
import { clearAuthStorage, getStoredToken } from "@/lib/auth/tokenStorage";

export default function ProtectedRoute({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const { isInitialized } = useSelector((state: RootState) => state.auth);
  const storedToken = getStoredToken();

  useLayoutEffect(() => {
    if (!isInitialized) return;

    if (!getStoredToken()) {
      clearAuthStorage();
      dispatch(logout());
      router.replace("/login");
    }
  }, [pathname, isInitialized, storedToken, dispatch, router]);

  if (!isInitialized || !storedToken) {
    return null;
  }

  return <>{children}</>;
}
