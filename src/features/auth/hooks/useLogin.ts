'use client'

import { useMutation } from "@tanstack/react-query";
import type { LoginPayload } from "../types";
import { login } from "@/features/auth/api";
import { useAppDispatch } from "@/lib/hook";
import { useRouter } from "next/navigation";
import { setSession } from "@/features/auth/store";
import { toast } from "sonner";
import { ApiError } from "@/lib/http";
import { appToast } from "@/lib/toast";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: (res) => {
      appToast.success("Login Success");
      dispatch(
        setSession({
          token: res.token,
          user: res.user,
        }),
      );
      router.push("/timeline");
    },
    onError: (error) => {
      appToast.error(
        error instanceof ApiError ? error.message : "Something went wrong"
      );
    },
  });
};
