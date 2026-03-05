import { api } from "@/lib/http";
import type { AuthData, LoginPayload, RegisterPayload } from "../types";

export const login = (payload: LoginPayload) => {
  return api<AuthData>({
    method: "POST",
    url: "/auth/login",
    data: payload,
  });
};

export const register = (payload: RegisterPayload) => {
  return api<AuthData>({
    method: "POST",
    url: "/auth/register",
    data: payload,
  });
};