export const THEME_STORAGE_KEY = "codesage-theme";

export type ResolvedTheme = "light" | "dark";
export type ThemePreference = ResolvedTheme | null;

export const THEME_BOOTSTRAP_SCRIPT = `(function(){try{var k="${THEME_STORAGE_KEY}";var stored=localStorage.getItem(k);var theme=(stored==="light"||stored==="dark")?stored:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");var root=document.documentElement;root.dataset.theme=theme;root.style.colorScheme=theme;}catch(e){}})();`;

export function getSystemTheme(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function getStoredTheme(): ThemePreference {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);

  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return null;
}

export function resolveTheme(preference: ThemePreference): ResolvedTheme {
  return preference ?? getSystemTheme();
}

export function applyTheme(theme: ResolvedTheme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function persistTheme(theme: ResolvedTheme) {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  applyTheme(theme);
}
