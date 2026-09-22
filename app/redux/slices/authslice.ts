import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import BASE_URL from "@/lib/api/baseUrl";
import {
  persistAccessToken,
  persistRefreshToken,
} from "@/lib/auth/tokenStorage";
import type {
  AuthUser,
  AuthState,
  LoginPayload,
  LoginRequest,
  SignupRequest,
} from "../types/auth.types";

export const signupUser = createAsyncThunk<LoginPayload, SignupRequest>(
  "auth/signupUser",
  async (signupData) => {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signupData),
    });

    if (!response.ok) {
      throw new Error("Signup failed");
    }

    return response.json();
  }
);

export const loginUser = createAsyncThunk<LoginPayload, LoginRequest>(
  "auth/loginUser",
  async (loginData) => {
    const response = await fetch(
      `${BASE_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      }
    );

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    const accessToken = data.data?.accessToken;
    const refreshToken = data.data?.refreshToken;

    if (!accessToken) {
      throw new Error("Login failed");
    }

    persistAccessToken(accessToken);

    if (refreshToken) {
      persistRefreshToken(refreshToken);
    }

    return {
      ...data.data,
      user: data.data?.user,
      token: accessToken,
    };
  }
);


type GetMeResponse = {
  user: AuthUser;
};

export const getCurrentUser = createAsyncThunk<AuthUser, string>(
  "auth/getCurrentUser",
  async (token) => {
    const response = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Unable to get current user");
    }

    const data: GetMeResponse = await response.json();
    return data.user;
  }
);




const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isInitialized: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = Boolean(action.payload.token);
      state.isLoading = false;
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = Boolean(action.payload.token);
        state.isLoading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Signup failed";
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = Boolean(action.payload.token);
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Login failed";
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = Boolean(state.token);
        state.isLoading = false;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = action.error.message ?? "Unable to get current user";
      });
  },
});

export const { login, logout, setInitialized, setLoading, clearError } =
  authSlice.actions;
export default authSlice.reducer;
