'use client'

import { useInfiniteQuery } from '@tanstack/react-query'

import { PaginationParams } from '@/types'
import { usersQueryKeys } from '@/features/user/queryKeys'
import { getMySavedPosts } from '@/features/user/api'
import { LIMIT_PAGE, STALE_TIME } from '@/constants'

export const useMySavedPostsInfinite = ({
    page= 1,
  limit = LIMIT_PAGE,
}: PaginationParams) => {
  return useInfiniteQuery({
    queryKey: usersQueryKeys.mySavedPosts(limit),
    staleTime: STALE_TIME,
    queryFn: ({ pageParam = 1 }) =>
      getMySavedPosts({
        page: pageParam,
        limit,
      }),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      const { page, totalPages } = lastPage.pagination

      return page < totalPages ? page + 1 : undefined
    },
  })
}