import type { InfiniteData, QueryClient } from '@tanstack/react-query'
import { postQueryKeys } from '@/features/post/queryKeys'
import { usersQueryKeys } from '@/features/user/queryKeys'
import type { UserProfileResponse } from '@/features/user/types'
import { LikesPage, QuerySnapshot } from '@/features/follow/lib/types'
import { isLikesInfiniteData } from '@/features/follow/lib/guard'

export const updateFollowStateInLikesCaches = ({
  queryClient,
  userId,
  following,
}: {
  queryClient: QueryClient
  userId: number
  following: boolean
}) => {
  const snapshots = queryClient.getQueriesData({
    queryKey: postQueryKeys.all,
  }) as QuerySnapshot[]

  snapshots.forEach(([queryKey, data]) => {
    if (!isLikesInfiniteData(data)) {
      return
    }

    const hasLikesSegment = queryKey.some(segment => segment === 'likes')

    if (!hasLikesSegment) {
      return
    }

    queryClient.setQueryData<InfiniteData<LikesPage>>(queryKey, {
      ...data,
      pages: data.pages.map(page => ({
        ...page,
        users: page.users.map(user =>
          user.id === userId
            ? {
                ...user,
                isFollowedByMe: following,
              }
            : user
        ),
      })),
    })
  })
}

export const updateUserProfileFollowCache = ({
  queryClient,
  username,
  following,
}: {
  queryClient: QueryClient
  username: string
  following: boolean
}) => {
  queryClient.setQueryData<UserProfileResponse>(
    usersQueryKeys.profile(username),
    old => {
      if (!old) {
        return old
      }

      return {
        ...old,
        isFollowing: following,
        counts: {
          ...old.counts,
          followers: Math.max(
            0,
            old.counts.followers + (following ? 1 : -1)
          ),
        },
      }
    }
  )
}