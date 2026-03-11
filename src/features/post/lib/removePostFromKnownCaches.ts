import { QueryClient } from "@tanstack/react-query";
import { LIMIT_PAGE } from "@/constants";
import { timelineQueryKeys } from "@/features/timeline/queryKeys";
import { usersQueryKeys } from "@/features/user/queryKeys";
import { MyProfileResponse } from "@/features/user/types";

import { removePostFromInfiniteData } from "./removePostFromInfiniteData";
import { updateKnownInfiniteQueries } from "./updateKnownInfiniteQueries";

export const removePostFromKnownCaches = ({
  queryClient,
  postId,
  username,
}: {
  queryClient: QueryClient;
  postId: number;
  username?: string;
}) => {
  const queryKeys = [
    timelineQueryKeys.infinite(LIMIT_PAGE),
    timelineQueryKeys.exploreInfinite(LIMIT_PAGE),
    usersQueryKeys.myPosts(LIMIT_PAGE),
    usersQueryKeys.mySavedPosts(LIMIT_PAGE),
    ...(username
      ? [
          usersQueryKeys.posts(username, LIMIT_PAGE),
          usersQueryKeys.likes(username, LIMIT_PAGE),
        ]
      : []),
  ];

  updateKnownInfiniteQueries({
    queryClient,
    queryKeys,
    updater: (old) => removePostFromInfiniteData(old, postId),
  });

  queryClient.setQueryData<MyProfileResponse>(
    usersQueryKeys.myProfile(),
    (old) => {
      if (!old) return old;

      return {
        ...old,
        stats: {
          ...old.stats,
          posts: Math.max(0, old.stats.posts - 1),
        },
      };
    },
  );
};
