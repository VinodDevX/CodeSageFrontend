"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, setInitialized } from "@/app/redux/slices/authslice";
import type { AppDispatch } from "@/app/redux/store";
import type { LoginPayload } from "@/app/redux/types/auth.types";

const AUTH_STORAGE_KEY = "auth";

export default function AuthInitializer() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);

      if (savedAuth) {
        const authData = JSON.parse(savedAuth) as LoginPayload;

        if (authData.user && authData.token) {
          dispatch(login(authData));
        } else {
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
      }
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } finally {
      dispatch(setInitialized(true));
    }
  }, [dispatch]);

  return null;
}
