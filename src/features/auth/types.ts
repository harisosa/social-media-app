import { User } from "@/features/user/types";

export type AuthToken = string;

export type AuthData = {
  token: AuthToken;
  user: User;
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