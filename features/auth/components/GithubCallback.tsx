"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "@/app/redux/slices/authslice";
import type { AppDispatch } from "@/app/redux/store";
import type { AuthUser } from "@/app/redux/types/auth.types";
import BASE_URL from "@/lib/api/baseUrl";
import axios from "axios";
import {
  AUTH_STORAGE_KEY,
  persistAccessToken,
  persistRefreshToken,
} from "@/lib/auth/tokenStorage";
import "./GithubCallback.css";

type ExchangeResponse = {
  accessToken?: string;
  refreshToken?: string;
  user?: AuthUser;
  message?: string;
  data?: {
    accessToken?: string;
    refreshToken?: string;
    user?: AuthUser;
  };
};

export default function GithubCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string | null>(null);
  const code = searchParams.get("code");
  const userId = searchParams.get("userId");

  useEffect(() => {
    if (!code || !userId) {
      return;
    }

    let cancelled = false;

    const exchangeCode = async () => {
      try {
        const { data } = await axios.post<ExchangeResponse>(
          `${BASE_URL}/api/github/exchange`,
          { code, userId },
          { withCredentials: true },
        );

        const accessToken = data.accessToken || data.data?.accessToken;
        const refreshToken = data.refreshToken || data.data?.refreshToken;
        const user = data.user || data.data?.user;

        if (!accessToken || !user) {
          throw new Error("GitHub sign-in did not return a token");
        }

        persistAccessToken(accessToken);

        if (refreshToken) {
          persistRefreshToken(refreshToken);
        }

        localStorage.setItem(
          AUTH_STORAGE_KEY,
          JSON.stringify({ user, token: accessToken, accessToken }),
        );
        dispatch(login({ user, token: accessToken }));

        if (!cancelled) {
          router.replace("/dashboard");
        }
      } catch (exchangeError) {
        console.error(exchangeError);
        if (!cancelled) {
          const apiMessage = axios.isAxiosError(exchangeError)
            ? (exchangeError.response?.data as ExchangeResponse | undefined)
                ?.message
            : undefined;

          setError(
            apiMessage ||
              (exchangeError instanceof Error
                ? exchangeError.message
                : "GitHub sign-in failed"),
          );
        }
      }
    };

    void exchangeCode();

    return () => {
      cancelled = true;
    };
  }, [code, dispatch, router, userId]);

  return (
    <div className="github-callback">
      <div className="github-callback-card">
        <h1>{error ? "GitHub sign-in failed" : "GitHub is logging you in"}</h1>
        <p>{error ?? "Please wait while GitHub finishes signing you in."}</p>
        {error ? <Link href="/login">Back to log in</Link> : null}
      </div>
    </div>
  );
}
