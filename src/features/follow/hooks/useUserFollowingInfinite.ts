'use client'

import { LIMIT_PAGE } from '@/constants'
import { getUserFollowing } from '@/features/follow/api'
import { followQueryKeys } from '@/features/follow/queryKeys'
import { GetFollowUsersParams } from '@/features/follow/types'
import { useInfiniteQuery } from '@tanstack/react-query'


export const useUserFollowingInfinite = ({
  username,
  limit = LIMIT_PAGE,
}: GetFollowUsersParams) => {
  return useInfiniteQuery({
    queryKey: followQueryKeys.followingList(username, limit),

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