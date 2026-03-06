'use client'

import { register } from "@/features/auth/api";
import { setSession } from "@/features/auth/store";
import { RegisterPayload } from "@/features/auth/types";
import { useAppDispatch } from "@/lib/hook";
import { ApiError } from "@/lib/http";
import { appToast } from "@/lib/toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useRegister = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => register(payload),
    onSuccess: (res) => {
      appToast.success("Register Success");
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
