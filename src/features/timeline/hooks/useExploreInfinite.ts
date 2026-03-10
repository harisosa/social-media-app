'use client'

import { getExplorePosts } from '@/features/timeline/api'
import { timelineQueryKeys } from '@/features/timeline/queryKeys'
import { GetPostResponse } from '@/features/timeline/types'
import { useInfiniteQuery } from '@tanstack/react-query'

type UseFeedPostsInfiniteParams = {
  limit?: number
}

const DEFAULT_LIMIT = 20

export const useExplorePostsInfinite = ({
  limit = DEFAULT_LIMIT,
}: UseFeedPostsInfiniteParams = {}) => {
  return useInfiniteQuery<GetPostResponse>({
    queryKey: timelineQueryKeys.exploreInfinite(limit),
    initialPageParam: 1,
    staleTime: 1000 * 30,
    queryFn: ({ pageParam }) =>
      getExplorePosts({
        page: Number(pageParam),
        limit,
      }),
    getNextPageParam: lastPage => {
      const { page, totalPages } = lastPage.pagination

      if (page >= totalPages) {
        return undefined
      }

      return page + 1
    },
  }
)
}