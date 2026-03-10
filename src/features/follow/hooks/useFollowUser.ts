'use client'

import { useMutation } from '@tanstack/react-query'

import {
  getUserProfileFollowSnapshot,
  rollbackFollowSnapshots,
  updateFollowStatesCaches,
  updateUserProfileFollowCache,
} from '@/features/follow/hooks/follow-cache'
import { followUser, unfollowUser } from '@/features/follow/api'
import { postQueryKeys } from '@/features/post/queryKeys'
import { queryClient } from '@/lib/query'

type FollowUserInput = {
  userId: number
  username: string
  following: boolean
}

export const useFollowUser = () => {

  return useMutation({
    mutationFn: async ({ username, following }: FollowUserInput) => {
      return following ? unfollowUser(username) : followUser(username)
    },

    onMutate: async ({ userId, username, following }) => {
      await queryClient.cancelQueries({
        queryKey: postQueryKeys.all,
      })

      const likesSnapshots = updateFollowStatesCaches({
        queryClient,
        userId,
        following: !following,
      })

      const profileSnapshot = getUserProfileFollowSnapshot({
        queryClient,
        username,
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

    onError: (_error, _variables, context) => {
      if (context?.snapshots) {
        rollbackFollowSnapshots({
          queryClient,
          snapshots: context.snapshots,
        })
      }
    },

    onSuccess: (response, variables) => {
      updateFollowStatesCaches({
        queryClient,
        userId: variables.userId,
        following: response.following,
      })

      updateUserProfileFollowCache({
        queryClient,
        username: variables.username,
        following: response.following,
      })
    },
  })
}