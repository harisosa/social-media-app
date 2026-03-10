"use client";

import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { timelineQueryKeys } from "@/features/timeline/queryKeys";
import type { GetPostResponse } from "@/features/timeline/types";
import { TogglePostLikeData } from "@/features/post/types";
import { likePost, unlikePost } from "@/features/post/api";
import { queryClient } from "@/lib/query";
import { selectIsAuthenticated } from "@/features/auth";
import { useAppSelector } from "@/lib/hook";
import { appToast } from "@/lib/toast";

type TogglePostLikeParams = {
  postId: number;
  likedByMe: boolean;
};

type TogglePostLikeContext = {
  previousTimelineQueries: Array<
    [readonly unknown[], InfiniteData<GetPostResponse> | undefined]
  >;
};

export const useTogglePostLike = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  return useMutation<
    TogglePostLikeData,
    Error,
    TogglePostLikeParams,
    TogglePostLikeContext
  >({
    mutationFn: async ({ postId, likedByMe }) => {
      if (likedByMe) {
        return unlikePost({ postId });
      }

      return likePost({ postId });
    },

    onMutate: async ({ postId, likedByMe }) => {
      await queryClient.cancelQueries({
        queryKey: timelineQueryKeys.all,
      });

      const previousTimelineQueries = queryClient.getQueriesData<
        InfiniteData<GetPostResponse>
      >({
        queryKey: timelineQueryKeys.all,
      });

      queryClient.setQueriesData<InfiniteData<GetPostResponse>>(
        {
          queryKey: timelineQueryKeys.all,
        },
        (old) => {
          if (!old) {
            return old;
          }

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              items: page.items.map((item) => {
                if (item.id !== postId) {
                  return item;
                }

                return {
                  ...item,
                  likedByMe: !likedByMe,
                  likeCount: likedByMe
                    ? Math.max(0, item.likeCount - 1)
                    : item.likeCount + 1,
                };
              }),
            })),
          };
        },
      );

      return {
        previousTimelineQueries,
      };
    },

    onError: (_error, _variables, context) => {
      if (!context?.previousTimelineQueries) {
        return;
      }

      context.previousTimelineQueries.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });

      if (!isAuthenticated) {
        appToast.error("Please login before like this post");
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: timelineQueryKeys.all,
      });
    },
  });
};
