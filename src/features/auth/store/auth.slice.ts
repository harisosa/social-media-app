import { User } from "@/features/user/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


export type AuthState = {
  accessToken: string | null;
  user: User | null;
};

const initialState: AuthState = {
  accessToken: null,
  user: null,
};

type SetSessionPayload = {
  token: string;
  user: User;
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