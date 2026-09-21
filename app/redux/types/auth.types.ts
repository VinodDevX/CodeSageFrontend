export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type LoginPayload = {
  user: AuthUser;
  token: string;
};

export type SignupPayload = LoginPayload;

export type SignupRequest = {
  name: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthState = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  isLoading: boolean;
  error: string | null;
};
