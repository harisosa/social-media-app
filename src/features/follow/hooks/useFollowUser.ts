'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { followUser, unfollowUser } from '@/features/follow/api'
import { postQueryKeys } from '@/features/post/queryKeys'
import { usersQueryKeys } from '@/features/user/queryKeys'
import { appToast } from '@/lib/toast'
import {
  getLikesCachesSnapshots,
  getUserProfileFollowSnapshot,
  rollbackFollowSnapshots,
  getFollowListCachesSnapshots
} from '@/features/follow/lib/snapshot'
import { updateFollowStateEverywhere } from '@/features/follow/lib/cache'

type FollowUserInput = {
  userId: number
  username: string
  following: boolean
}

export const useFollowUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ username, following }: FollowUserInput) => {
      return following ? unfollowUser(username) : followUser(username)
    },

    onMutate: async ({ userId, username, following }) => {
      await Promise.all([
        queryClient.cancelQueries({
          queryKey: postQueryKeys.all,
        }),
        queryClient.cancelQueries({
          queryKey: usersQueryKeys.all,
        }),
      ])

      const likesSnapshots = getLikesCachesSnapshots({
        queryClient,
      })

      const followListSnapshots = getFollowListCachesSnapshots({
        queryClient,
      })

      const profileSnapshot = getUserProfileFollowSnapshot({
        queryClient,
        username,
      })

      updateFollowStateEverywhere({
        queryClient,
        userId,
        username,
        following: !following,
      })
      

      return {
        snapshots: [
          ...likesSnapshots,
          ...followListSnapshots,
          profileSnapshot,
        ],
      }
    },

    onError: (error, _variables, context) => {
      console.log(error)
      if (context?.snapshots) {
        rollbackFollowSnapshots({
          queryClient,
          snapshots: context.snapshots,
        })
      }

      appToast.error('Failed to update follow status')
    },
  })
}