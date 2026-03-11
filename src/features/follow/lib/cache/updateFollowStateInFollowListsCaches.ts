import type { InfiniteData, QueryClient } from '@tanstack/react-query'
import { followQueryKeys } from '@/features/follow/queryKeys'
import {
  isFollowListInfiniteData,
  type FollowListPage,
} from '@/features/follow/lib/guard/isFollowListInfiniteData'

export const updateFollowStateInFollowListsCaches = ({
  queryClient,
  userId,
  following,
}: {
  queryClient: QueryClient
  userId: number
  following: boolean
}) => {
  queryClient.setQueriesData<InfiniteData<FollowListPage>>(
    {
      queryKey: followQueryKeys.all,
    },
    old => {
      if (!old) {
        return old
      }

      if (!isFollowListInfiniteData(old)) {
        return old
      }

      let hasChanged = false

      const nextPages = old.pages.map(page => {
        let pageChanged = false

        const nextUsers = page.users.map(user => {
          if (user.id !== userId) {
            return user
          }

          const currentValue =
            typeof user.isFollowedByMe === 'boolean'
              ? user.isFollowedByMe
              : user.isFollowing

          if (currentValue === following) {
            return user
          }

          pageChanged = true
          hasChanged = true

          return {
            ...user,
            ...(typeof user.isFollowedByMe === 'boolean'
              ? { isFollowedByMe: following }
              : {}),
            ...(typeof user.isFollowing === 'boolean'
              ? { isFollowing: following }
              : {}),
          }
        })

        if (!pageChanged) {
          return page
        }

        return {
          ...page,
          users: nextUsers,
        }
      })

      if (!hasChanged) {
        return old
      }

      return {
        ...old,
        pages: nextPages,
      }
    }
  )
}