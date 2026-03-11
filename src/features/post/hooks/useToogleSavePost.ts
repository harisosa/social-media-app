"use client";

import { useMutation } from "@tanstack/react-query";

import { savePost, unsavePost } from "@/features/post/api";
import {
  patchTimelineSaveState,
  removePostFromInfiniteData,
} from "@/features/post/lib";
import { postQueryKeys } from "@/features/post/queryKeys";
import type { TogglePostSaveData } from "@/features/post/types";
import { timelineQueryKeys } from "@/features/timeline/queryKeys";
import { usersQueryKeys } from "@/features/user/queryKeys";
import { queryClient } from "@/lib/query";

type TogglePostSaveParams = {
  postId: number;
  isSaved: boolean;
};

type TogglePostSaveContext = {
  previousTimelineQueries: Array<[readonly unknown[], unknown]>;
  previousSavedQueries: Array<[readonly unknown[], unknown]>;
};

export const useTogglePostSave = () => {
  return useMutation<
    TogglePostSaveData,
    Error,
    TogglePostSaveParams,
    TogglePostSaveContext
  >({
    mutationFn: ({ postId, isSaved }) => {
      if (isSaved) {
        return unsavePost({ postId });
      }

      return savePost({ postId });
    },

    onMutate: async ({ postId, isSaved }) => {
      await Promise.all([
        queryClient.cancelQueries({
          queryKey: timelineQueryKeys.all,
        }),
        queryClient.cancelQueries({
          queryKey: [...usersQueryKeys.me(), "saved-posts"],
        }),
      ]);

      const previousTimelineQueries = queryClient.getQueriesData({
        queryKey: timelineQueryKeys.all,
      });

      const previousSavedQueries = queryClient.getQueriesData({
        queryKey: [...usersQueryKeys.me(), "saved-posts"],
      });

      queryClient.setQueriesData(
        {
          queryKey: timelineQueryKeys.all,
        },
        (old) => patchTimelineSaveState(old, postId, isSaved),
      );

      queryClient.setQueryData(postQueryKeys.detail(postId), (old: unknown) => {
        if (!old || typeof old !== "object") {
          return old;
        }

        const data = old as { id?: number; isSaved?: boolean };

        if (data.id !== postId) {
          return old;
        }

        return {
          ...data,
          isSaved: !isSaved,
        };
      });

      if (isSaved) {
        queryClient.setQueriesData(
          {
            queryKey: [...usersQueryKeys.me(), "saved-posts"],
          },
          (old) => removePostFromInfiniteData(old, postId),
        );
      }

      return {
        previousTimelineQueries,
        previousSavedQueries,
      };
    },

    onError: (_error, _variables, context) => {
      if (!context) {
        return;
      }

      context.previousTimelineQueries.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });

      context.previousSavedQueries.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },

    onSettled: async (_data, _error, { postId }) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: timelineQueryKeys.all,
        }),
        queryClient.invalidateQueries({
          queryKey: [...usersQueryKeys.me(), "saved-posts"],
        }),
        queryClient.invalidateQueries({
          queryKey: postQueryKeys.detail(postId),
        }),
      ]);
    },
  });
};