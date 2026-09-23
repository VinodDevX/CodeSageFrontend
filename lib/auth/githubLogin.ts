import BASE_URL from "@/lib/api/baseUrl";

export function startGithubLogin() {
  window.location.assign(`${BASE_URL}/api/auth/login-with-github`);
}
