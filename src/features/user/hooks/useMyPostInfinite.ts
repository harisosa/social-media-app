'use client'

import { LIMIT_PAGE } from '@/constants'
import { getMyPosts } from '@/features/user/api'
import { usersQueryKeys } from '@/features/user/queryKeys'
import { useInfiniteQuery } from '@tanstack/react-query'

type UseMyPostsInfiniteParams = {
  limit?: number
}

export const useMyPostsInfinite = ({
  limit = LIMIT_PAGE,
}: UseMyPostsInfiniteParams = {}) => {
  return useInfiniteQuery({
    queryKey: usersQueryKeys.myPosts(limit),
    queryFn: ({ pageParam = 1 }) =>
      getMyPosts({
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