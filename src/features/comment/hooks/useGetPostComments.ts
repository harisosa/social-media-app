"use client"

import { getPostComments } from "@/features/comment/api.ts/api"
import { commentsQueryKeys } from "@/features/comment/queryKeys"
import { useInfiniteQuery } from "@tanstack/react-query"


const DEFAULT_COMMENTS_LIMIT = 10

export const useGetPostComments = (
  postId: number,
  limit: number = DEFAULT_COMMENTS_LIMIT
) => {
  return useInfiniteQuery({
    queryKey: commentsQueryKeys.list(postId, limit),
    queryFn: ({ pageParam }) =>
      getPostComments({
        postId,
        page: pageParam,
        limit,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination
      return page < totalPages ? page + 1 : undefined
    },
    enabled: Number.isFinite(postId) && postId > 0,
  })
}