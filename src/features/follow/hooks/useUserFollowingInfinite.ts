'use client'

import { getUserFollowing } from '@/features/follow/api'
import { GetFollowUsersParams } from '@/features/follow/types'
import { useInfiniteQuery } from '@tanstack/react-query'


export const useUserFollowingInfinite = ({
  username,
  limit = 20,
}: GetFollowUsersParams) => {
  return useInfiniteQuery({
    queryKey: ['users', username, 'following', limit],

    queryFn: ({ pageParam = 1 }) =>
      getUserFollowing({
        username,
        page: pageParam,
        limit,
      }),

    getNextPageParam: lastPage => {
      const { page, totalPages } = lastPage.pagination
      return page < totalPages ? page + 1 : undefined
    },

    initialPageParam: 1,
  })
}