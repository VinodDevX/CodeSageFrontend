"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/redux/store";

export default function PublicRoute({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const { token, isInitialized } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isInitialized && token) {
      router.replace("/dashboard");
    }
  }, [isInitialized, token, router]);

  if (!isInitialized || token) {
    return null;
  }

  return <>{children}</>;
}
