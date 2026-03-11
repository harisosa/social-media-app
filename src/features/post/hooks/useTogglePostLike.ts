"use client";

import { useMutation } from "@tanstack/react-query";

import { likePost, unlikePost } from "@/features/post/api";
import { patchTimelineLikeState } from "@/features/post/lib";
import { postQueryKeys } from "@/features/post/queryKeys";
import type { TogglePostLikeData } from "@/features/post/types";
import { timelineQueryKeys } from "@/features/timeline/queryKeys";
import { queryClient } from "@/lib/query";

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

    onMutate: async ({ postId, likedByMe }) => {
      await queryClient.cancelQueries({
        queryKey: timelineQueryKeys.all,
      });

      const previousTimelineQueries = queryClient.getQueriesData({
        queryKey: timelineQueryKeys.all,
      });

      queryClient.setQueriesData({ queryKey: timelineQueryKeys.all }, (old) =>
        patchTimelineLikeState(old, {
          postId,
          liked: !likedByMe,
        }),
      );

      return { previousTimelineQueries };
    },

    onError: (_error, _variables, context) => {
      if (!context?.previousTimelineQueries) {
        return;
      }

      context.previousTimelineQueries.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },

    onSuccess: (data, { postId }) => {
      queryClient.setQueriesData({ queryKey: timelineQueryKeys.all }, (old) =>
        patchTimelineLikeState(old, {
          postId,
          liked: data.liked,
          likeCount: data.likeCount,
        }),
      );
    },

    onSettled: async (_data, _error, { postId }) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: postQueryKeys.likes(postId),
        }),
        queryClient.invalidateQueries({
          queryKey: postQueryKeys.detail(postId),
        }),
      ]);
    },
  });
};