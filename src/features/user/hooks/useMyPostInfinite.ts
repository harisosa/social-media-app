'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { getMyPosts } from '../api'
import { usersQueryKeys } from '../queryKeys'

type UseMyPostsInfiniteParams = {
  limit?: number
}

export const useMyPostsInfinite = ({
  limit = 9,
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