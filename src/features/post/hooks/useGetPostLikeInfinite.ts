"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import { postQueryKeys } from "../queryKeys"
import { PostLikesData } from "@/features/post/types"
import { getPostLikes } from "@/features/post/api"

type UsePostLikesInfiniteParams = {
  postId: number
  limit?: number
  enabled?: boolean
}

export const useGetPostLikesInfinite = ({
  postId,
  limit = 20,
  enabled = true,
}: UsePostLikesInfiniteParams) => {
  return useInfiniteQuery<PostLikesData>({
    queryKey: postQueryKeys.likesInfinite(postId, limit),
    initialPageParam: 1,
    enabled,
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
    staleTime: 1000 * 60,
  })
}