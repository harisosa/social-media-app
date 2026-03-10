"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { clearSession } from "@/features/auth/store";
import { useAppDispatch } from "@/lib/hook";
import { appToast } from "@/lib/toast";
import { usersQueryKeys } from "@/features/user/queryKeys";
import { queryClient } from "@/lib/query";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      return Promise.resolve();
    },
    onSuccess: async () => {
      dispatch(clearSession());

      await queryClient.removeQueries({
        queryKey: usersQueryKeys.all,
      });

      appToast.success("Logout Success");
      router.push("/login");
    },
  });
};