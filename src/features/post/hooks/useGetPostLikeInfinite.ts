"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import { postQueryKeys } from "../queryKeys"
import { PostLikesData } from "@/features/post/types"
import { getPostLikes } from "@/features/post/api"
import { LIMIT_PAGE, STALE_TIME } from "@/constants"

type UsePostLikesInfiniteParams = {
  postId: number
  limit?: number
  enabled?: boolean
}

export const useGetPostLikesInfinite = ({
  postId,
  limit = LIMIT_PAGE,
}: UsePostLikesInfiniteParams) => {
  return useInfiniteQuery<PostLikesData>({
    queryKey: postQueryKeys.likesInfinite(postId, limit),
    initialPageParam: 1,
    enabled: !!postId,
    queryFn: ({ pageParam }) =>
      getPostLikes({
        postId,
        page: pageParam as number,
        limit,
      }),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination
      return page >= totalPages? undefined : page + 1
    },
    staleTime: STALE_TIME,
  })
}