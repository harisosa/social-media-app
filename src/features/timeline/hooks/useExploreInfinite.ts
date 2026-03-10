'use client'

import { LIMIT_PAGE } from '@/constants'
import { getExplorePosts } from '@/features/timeline/api'
import { timelineQueryKeys } from '@/features/timeline/queryKeys'
import { GetPostResponse } from '@/features/timeline/types'
import { useInfiniteQuery } from '@tanstack/react-query'

type UseFeedPostsInfiniteParams = {
  limit?: number
}


export const useExplorePostsInfinite = ({
  limit = LIMIT_PAGE,
}: UseFeedPostsInfiniteParams = {}) => {
  return useInfiniteQuery({
      queryKey: timelineQueryKeys.exploreInfinite(limit),
      initialPageParam: 1,
      staleTime: 1000 * 30,
      queryFn: ({ pageParam }) =>
        getExplorePosts({
          page: pageParam,
          limit,
        }),
      getNextPageParam: (lastPage: GetPostResponse) => {
        const { page, totalPages } = lastPage.pagination
        return page < totalPages ? page + 1 : undefined
      },
    })
}