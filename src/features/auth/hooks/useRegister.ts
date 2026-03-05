import { register } from "@/features/auth/api";
import { RegisterPayload } from "@/features/auth/types";
import { useMutation } from "@tanstack/react-query";


export const useRegister = () => {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => register(payload),
  });
};