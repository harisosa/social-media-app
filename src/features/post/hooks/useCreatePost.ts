"use client";

import { useMutation } from "@tanstack/react-query";
import { CreatePostPayload } from "@/features/post/types";
import { createPost } from "@/features/post/api";
import { appToast } from "@/lib/toast";
import { timelineQueryKeys } from "@/features/timeline/queryKeys";
import { queryClient } from "@/lib/query";
import { usersQueryKeys } from "@/features/user/queryKeys";
import { useRouter } from "next/navigation";
import { MyProfileResponse } from "@/features/user/types";

export const useCreatePost = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: CreatePostPayload) => createPost(payload),

    onSuccess: () => {
      queryClient.setQueryData<MyProfileResponse>(
        usersQueryKeys.myProfile(),
        (old) => {
          if (!old) return old;

          return {
            ...old,
            stats: {
              ...old.stats,
              posts: old.stats.posts + 1,
            },
          };
        }
      );

      queryClient.invalidateQueries({ queryKey: timelineQueryKeys.all });

      router.push("/timeline");

      appToast.success("Post created");
    },

    onError: () => {
      appToast.error("Failed to create post");
    },
  });
};