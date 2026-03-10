'use client'

import { useMutation } from '@tanstack/react-query'

import { followUser, unfollowUser } from '@/features/follow/api'
import { postQueryKeys } from '@/features/post/queryKeys'
import { usersQueryKeys } from '@/features/user/queryKeys'
import { queryClient } from '@/lib/query'
import { useAppSelector } from '@/lib/hook'
import { selectIsAuthenticated } from '@/features/auth'
import { appToast } from '@/lib/toast'
import {
  getLikesCachesSnapshots,
  getUserProfileFollowSnapshot,
  invalidateUserFollowLists,
  rollbackFollowSnapshots,
  updateFollowStateInLikesCaches,
  updateUserProfileFollowCache,
} from '@/features/follow/lib'

type FollowUserInput = {
  userId: number
  username: string
  following: boolean
}

export const useFollowUser = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  return useMutation({
    mutationFn: async ({ username, following }: FollowUserInput) => {
      if (!isAuthenticated) {
        throw new Error('AUTH_REQUIRED')
      }

      return following ? unfollowUser(username) : followUser(username)
    },

    onMutate: async ({ userId, username, following }) => {
      await queryClient.cancelQueries({
        queryKey: postQueryKeys.all,
      })

      await queryClient.cancelQueries({
        queryKey: usersQueryKeys.all,
      })

      const likesSnapshots = getLikesCachesSnapshots({
        queryClient,
      })

      const profileSnapshot = getUserProfileFollowSnapshot({
        queryClient,
        username,
      })

      updateFollowStateInLikesCaches({
        queryClient,
        userId,
        following: !following,
      })

      updateUserProfileFollowCache({
        queryClient,
        username,
        following: !following,
      })

      return {
        snapshots: [...likesSnapshots, profileSnapshot],
      }
    },

    onError: (error, _variables, context) => {
      if (context?.snapshots) {
        rollbackFollowSnapshots({
          queryClient,
          snapshots: context.snapshots,
        })
      }

      if (error instanceof Error && error.message === 'AUTH_REQUIRED') {
        appToast.error('Please login before follow this user')
        return
      }

      appToast.error('Failed to update follow status')
    },

    onSuccess: (response, variables) => {
      updateFollowStateInLikesCaches({
        queryClient,
        userId: variables.userId,
        following: response.following,
      })

      updateUserProfileFollowCache({
        queryClient,
        username: variables.username,
        following: response.following,
      })

      invalidateUserFollowLists({
        queryClient,
        username: variables.username,
      })
    },
  })
}