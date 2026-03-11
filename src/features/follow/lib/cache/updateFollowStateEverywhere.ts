import type { QueryClient } from '@tanstack/react-query'
import { 
    updateUserProfileFollowCache, 
    updateFollowStateInLikesCaches, 
    updateFollowStateInFollowListsCaches, 
    updateMyProfileFollowCountCache } from '@/features/follow/lib/cache'


export const updateFollowStateEverywhere = ({
  queryClient,
  userId,
  username,
  following,
}: {
  queryClient: QueryClient
  userId: number
  username: string
  following: boolean
}) => {
  updateUserProfileFollowCache({
    queryClient,
    username,
    following,
  })

    updateMyProfileFollowCountCache({
    queryClient,
    delta: following ? 1 : -1,
  })

  updateFollowStateInLikesCaches({
    queryClient,
    userId,
    following,
  })

  updateFollowStateInFollowListsCaches({
    queryClient,
    userId,
    following,
  })
}