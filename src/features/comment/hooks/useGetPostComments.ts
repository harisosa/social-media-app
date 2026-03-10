"use client"

import { getPostComments } from "@/features/comment/api/api"
import { commentsQueryKeys } from "@/features/comment/queryKeys"
import { useInfiniteQuery } from "@tanstack/react-query"

export const useGetPostComments = (
  postId: number,
  limit: number
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
    staleTime: 1000 * 30,
  })
}