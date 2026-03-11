"use client";

import { InfiniteData, useMutation } from "@tanstack/react-query";

import { likePost, unlikePost } from "@/features/post/api";
import { postQueryKeys } from "@/features/post/queryKeys";
import type { TogglePostLikeData } from "@/features/post/types";
import { timelineQueryKeys } from "@/features/timeline/queryKeys";
import type { GetPostResponse } from "@/features/timeline/types";
import { queryClient } from "@/lib/query";
import { patchTimelineLikeState } from "@/features/post/lib";

type TogglePostLikeParams = {
  postId: number;
  likedByMe: boolean;
};

type TogglePostLikeContext = {
  previousTimelineQueries: Array<[readonly unknown[], unknown]>;
};

export const useTogglePostLike = () => {
  return useMutation<
    TogglePostLikeData,
    Error,
    TogglePostLikeParams,
    TogglePostLikeContext
  >({
    mutationFn: ({ postId, likedByMe }) => {
      if (likedByMe) {
        return unlikePost({ postId });
      }

      return likePost({ postId });
    },

    onMutate: async ({ postId }): Promise<TogglePostLikeContext> => {
      await queryClient.cancelQueries({
        queryKey: timelineQueryKeys.all,
      });

      const previousTimelineQueries = queryClient.getQueriesData({
        queryKey: timelineQueryKeys.all,
      });

      queryClient.setQueriesData(
        {
          queryKey: timelineQueryKeys.all,
        },
        (old) => patchTimelineLikeState(old, postId),
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
    },

    onSettled: async (_data, _error, { postId }) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [...postQueryKeys.likes(postId)],
        }),
        queryClient.invalidateQueries({
          queryKey: postQueryKeys.detail(postId),
        }),
      ]);
    },
  });
};
