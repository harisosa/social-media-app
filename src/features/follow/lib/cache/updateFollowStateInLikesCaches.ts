import type { InfiniteData, QueryClient } from '@tanstack/react-query'
import { postQueryKeys } from '@/features/post/queryKeys'
import type { LikesPage } from '@/features/follow/lib/types'
import { isLikesInfiniteData } from '@/features/follow/lib/guard/isLikesInfiniteData'
import { isLikesQueryKey } from '@/features/follow/lib/cache/isLikesQueryKey'

export const updateFollowStateInLikesCaches = ({
  queryClient,
  userId,
  following,
}: {
  queryClient: QueryClient
  userId: number
  following: boolean
}) => {
  const queries = queryClient.getQueriesData({
    queryKey: postQueryKeys.all,
  })

  queries.forEach(([queryKey, data]) => {
    if (!Array.isArray(queryKey)) {
      return
    }

    if (!isLikesQueryKey(queryKey)) {
      return
    }

    if (!isLikesInfiniteData(data)) {
      return
    }

    queryClient.setQueryData<InfiniteData<LikesPage>>(queryKey, old => {
      if (!old) {
        return old
      }

      let hasChanged = false

      const nextPages = old.pages.map(page => {
        let pageChanged = false

        const nextUsers = page.users.map(user => {
          if (user.id !== userId) {
            return user
          }

          if (user.isFollowedByMe === following) {
            return user
          }

          pageChanged = true
          hasChanged = true

          return {
            ...user,
            isFollowedByMe: following,
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
    })
  })
}