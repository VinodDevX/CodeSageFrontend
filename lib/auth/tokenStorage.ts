const AUTH_STORAGE_KEY = "auth";
const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const TOKEN_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export { AUTH_STORAGE_KEY, ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY };

function setTokenCookie(token: string) {
  document.cookie = `${ACCESS_TOKEN_KEY}=${encodeURIComponent(token)}; Path=/; SameSite=Lax; Max-Age=${TOKEN_COOKIE_MAX_AGE}`;
}

function clearTokenCookie() {
  document.cookie = `${ACCESS_TOKEN_KEY}=; Path=/; Max-Age=0`;
}

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function persistAccessToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
  setTokenCookie(token);
}

export function persistRefreshToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
}

export function clearAuthStorage() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  clearTokenCookie();
}
