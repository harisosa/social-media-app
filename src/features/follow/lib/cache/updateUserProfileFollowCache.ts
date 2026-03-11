import type { QueryClient } from '@tanstack/react-query'
import { usersQueryKeys } from '@/features/user/queryKeys'
import type { UserProfileResponse } from '@/features/user/types'

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

      if (old.isFollowing === following) {
        return old
      }

      const followerDelta = following ? 1 : -1

      return {
        ...old,
        isFollowing: following,
        counts: {
          ...old.counts,
          followers: Math.max(0, old.counts.followers + followerDelta),
        },
      }
    }
  )
}