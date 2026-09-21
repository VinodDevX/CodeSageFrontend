"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/redux/store";

export default function ProtectedRoute({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const { isAuthenticated, isInitialized } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isInitialized, router]);

  if (!isInitialized || !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
