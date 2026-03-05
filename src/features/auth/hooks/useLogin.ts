import { useMutation } from "@tanstack/react-query";
import type { LoginPayload } from "../types";
import { login } from "@/features/auth/api";

export const useLogin = () => {
  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
  });
};