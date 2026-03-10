import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AuthState = {
  accessToken: string | null;
};

const initialState: AuthState = {
  accessToken: null,
};

type SetSessionPayload = {
  token: string;
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<SetSessionPayload>) => {
      state.accessToken = action.payload.token;
    },
    clearSession: (state) => {
      state.accessToken = null;
    },
  },
});

export const { setSession, clearSession } = authSlice.actions;
export const authReducer = authSlice.reducer;