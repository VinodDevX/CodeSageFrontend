"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, setInitialized } from "@/app/redux/slices/authslice";
import type { AppDispatch } from "@/app/redux/store";
import type { AuthUser, LoginPayload } from "@/app/redux/types/auth.types";
import {
  AUTH_STORAGE_KEY,
  ACCESS_TOKEN_KEY,
  clearAuthStorage,
  persistAccessToken,
} from "@/lib/auth/tokenStorage";

function readStoredSession(): {
  token: string | null;
  user: AuthUser | null;
} {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!savedAuth && !accessToken) {
    return { token: null, user: null };
  }

  try {
    const authData = savedAuth
      ? (JSON.parse(savedAuth) as LoginPayload & { accessToken?: string })
      : null;

    const token =
      accessToken || authData?.token || authData?.accessToken || null;

    return { token, user: authData?.user ?? null };
  } catch {
    return { token: accessToken, user: null };
  }
}

export default function AuthInitializer() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    try {
      const { token, user } = readStoredSession();

      if (token) {
        persistAccessToken(token);
        dispatch(
          login({
            token,
            user: user ?? { id: "", name: "", email: "" },
          })
        );
      } else {
        clearAuthStorage();
      }
    } catch {
      clearAuthStorage();
    } finally {
      dispatch(setInitialized(true));
    }
  }, [dispatch]);

  return null;
}
