"use client"

import { STALE_TIME } from "@/constants"
import { getPostDetail } from "@/features/post/api"
import { postQueryKeys } from "@/features/post/queryKeys"
import { useQuery } from "@tanstack/react-query"



export const usePostDetail = (postId: number) => {
  return useQuery({
    queryKey: postQueryKeys.detail(postId),
    queryFn: () => getPostDetail(postId),
    enabled: Number.isFinite(postId) && postId > 0,
    staleTime: STALE_TIME
  })
}