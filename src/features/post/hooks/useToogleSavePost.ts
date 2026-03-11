"use client";

import { useMutation } from "@tanstack/react-query";

import { selectIsAuthenticated } from "@/features/auth";
import { savePost, unsavePost } from "@/features/post/api";
import type { TogglePostSaveData } from "@/features/post/types";
import { timelineQueryKeys } from "@/features/timeline/queryKeys";
import { useAppSelector } from "@/lib/hook";
import { queryClient } from "@/lib/query";
import { appToast } from "@/lib/toast";

type TogglePostSaveParams = {
  postId: number;
  isSaved: boolean;
};

type TogglePostSaveContext = {
  previousTimelineQueries: Array<[readonly unknown[], unknown]>;
};

type SaveableEntity = {
  id: number;
  isSaved: boolean;
};

type InfinitePageWithItems<TItem> = {
  items: TItem[];
  pagination?: unknown;
};

type InfinitePageWithPosts<TItem> = {
  posts: TItem[];
  pagination?: unknown;
};

type InfinitePage<TItem> =
  | InfinitePageWithItems<TItem>
  | InfinitePageWithPosts<TItem>;

type InfiniteTimelineData<TItem> = {
  pages: InfinitePage<TItem>[];
  pageParams: unknown[];
};

const hasItems = <TItem,>(
  page: InfinitePage<TItem>,
): page is InfinitePageWithItems<TItem> => {
  return "items" in page && Array.isArray(page.items);
};

const hasPosts = <TItem,>(
  page: InfinitePage<TItem>,
): page is InfinitePageWithPosts<TItem> => {
  return "posts" in page && Array.isArray(page.posts);
};

const patchTimelineSaveState = <TItem extends SaveableEntity>(
  old: unknown,
  postId: number,
  isSaved: boolean,
): InfiniteTimelineData<TItem> | undefined => {
  if (!old || typeof old !== "object") {
    return undefined;
  }

  const data = old as InfiniteTimelineData<TItem>;

  if (!Array.isArray(data.pages)) {
    return data;
  }

  return {
    ...data,
    pages: data.pages.map((page) => {
      if (hasItems(page)) {
        return {
          ...page,
          items: page.items.map((item) => {
            if (item.id !== postId) {
              return item;
            }

            return {
              ...item,
              isSaved: !isSaved,
            };
          }),
        };
      }

      if (hasPosts(page)) {
        return {
          ...page,
          posts: page.posts.map((post) => {
            if (post.id !== postId) {
              return post;
            }

            return {
              ...post,
              isSaved: !isSaved,
            };
          }),
        };
      }

      return page;
    }),
  };
};

export const useTogglePostSave = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return useMutation<
    TogglePostSaveData,
    Error,
    TogglePostSaveParams,
    TogglePostSaveContext
  >({
    mutationFn: async ({ postId, isSaved }) => {
      if (isSaved) {
        return unsavePost({ postId });
      }

      return savePost({ postId });
    },

    onMutate: async ({ postId, isSaved }) => {
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
        (old) => patchTimelineSaveState(old, postId, isSaved),
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
        appToast.error("Please login before save this post");
      }
    },
  });
};