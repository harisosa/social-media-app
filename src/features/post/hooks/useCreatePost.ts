"use client";

import { useMutation } from "@tanstack/react-query";
import { CreatePostPayload } from "@/features/post/types";
import { createPost } from "@/features/post/api";
import { appToast } from "@/lib/toast";
import { timelineQueryKeys } from "@/features/timeline/queryKeys";
import { queryClient } from "@/lib/query";
import { usersQueryKeys } from "@/features/user/queryKeys";
import { useRouter } from "next/navigation";

export const useCreatePost = () => {
  const route = useRouter()
  return useMutation({
    mutationFn: (payload: CreatePostPayload) => createPost(payload),

    onSuccess: () => {
        queryClient.invalidateQueries({queryKey:timelineQueryKeys.all})
        queryClient.invalidateQueries({queryKey:usersQueryKeys.me()})
        route.push('/timeline')
      appToast.success("Post created");
    },

    onError: () => {
      appToast.error("Failed to create post");
    },
  });
};
