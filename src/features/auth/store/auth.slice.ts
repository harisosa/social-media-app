import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser } from "../types";

export type AuthState = {
  accessToken: string | null;
  user: AuthUser | null;
};

const initialState: AuthState = {
  accessToken: null,
  user: null,
};

type SetSessionPayload = {
  token: string;
  user: AuthUser;
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<SetSessionPayload>) => {
      state.accessToken = action.payload.token;
      state.user = action.payload.user;
    },
    clearSession: (state) => {
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const { setSession, clearSession } = authSlice.actions;
export const authReducer = authSlice.reducer;