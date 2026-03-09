'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { getMySavedPosts } from '../api'
import { usersQueryKeys } from '../queryKeys'
import { PaginationParams } from '@/types'

export const useMySavedPostsInfinite = ({
    page= 1,
  limit = 9,
}: PaginationParams) => {
  return useInfiniteQuery({
    queryKey: usersQueryKeys.mySavedPosts(limit),
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