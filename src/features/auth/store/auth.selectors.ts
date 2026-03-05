import type { RootState } from "@/features/auth/store"; 

export const selectAuth = (state: RootState) => state.auth;

export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectAuthUser = (state: RootState) => state.auth.user;

export const selectIsAuthenticated = (state: RootState) =>
  Boolean(state.auth.accessToken);