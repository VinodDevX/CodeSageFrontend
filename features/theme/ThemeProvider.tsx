"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  THEME_STORAGE_KEY,
  applyTheme,
  getStoredTheme,
  persistTheme,
  resolveTheme,
  type ResolvedTheme,
} from "@/lib/theme/theme";

type ThemeContextValue = {
  theme: ResolvedTheme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [theme, setTheme] = useState<ResolvedTheme>(() => {
    if (typeof document === "undefined") return "dark";
    return document.documentElement.dataset.theme === "light" ? "light" : "dark";
  });

  useEffect(() => {
    const applied =
      document.documentElement.dataset.theme === "light" ? "light" : "dark";
    setTheme(applied);

    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const syncFromSystem = () => {
      if (getStoredTheme()) return;
      const next = resolveTheme(null);
      applyTheme(next);
      setTheme(next);
    };

    const syncFromStorage = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY) return;
      const next = resolveTheme(getStoredTheme());
      applyTheme(next);
      setTheme(next);
    };

    media.addEventListener("change", syncFromSystem);
    window.addEventListener("storage", syncFromStorage);

    return () => {
      media.removeEventListener("change", syncFromSystem);
      window.removeEventListener("storage", syncFromStorage);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    const next: ResolvedTheme = theme === "dark" ? "light" : "dark";
    persistTheme(next);
    setTheme(next);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
