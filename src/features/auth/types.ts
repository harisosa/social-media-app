import type { ApiResponse } from "@/lib/http/types";

export type AuthUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  avatarUrl: string | null;
};

export type AuthToken = string;

export type AuthData = {
  token: AuthToken;
  user: AuthUser;
};
export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
};