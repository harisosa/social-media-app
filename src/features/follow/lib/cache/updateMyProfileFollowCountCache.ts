import type { QueryClient } from '@tanstack/react-query'
import { usersQueryKeys } from '@/features/user/queryKeys'
import { MyProfileResponse } from '@/features/user/types'


export const updateMyProfileFollowCountCache = ({
  queryClient,
  delta,
}: {
  queryClient: QueryClient
  delta: 1 | -1
}) => {
  queryClient.setQueryData<MyProfileResponse>(
    usersQueryKeys.myProfile(),
    old => {
      if (!old) {
        return old
      }

      const nextFollowingCount = Math.max(0, old.stats.following + delta)

      if (nextFollowingCount === old.stats.following) {
        return old
      }

      return {
        ...old,
        stats: {
          ...old.stats,
          following: nextFollowingCount,
        },
      }
    }
  )
}