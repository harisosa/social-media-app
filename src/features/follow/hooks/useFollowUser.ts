"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"

import {
  rollbackFollowSnapshots,
  updateFollowStateInPostLikesCaches,
} from "@/features/follow/hooks/follow-cache"
import { followUser, unfollowUser } from "@/features/follow/api"
import { postQueryKeys } from "@/features/post/queryKeys"

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

    onMutate: async ({ userId, following }) => {
      await queryClient.cancelQueries({
        queryKey: postQueryKeys.all,
      })

      const snapshots = updateFollowStateInPostLikesCaches({
        queryClient,
        userId,
        following: !following,
      })

      return { snapshots }
    },

    onError: (error, _variables, context) => {
      if (context?.snapshots) {
        rollbackFollowSnapshots({
          queryClient,
          snapshots: context.snapshots,
        })
      }
    },

    onSuccess: (response, variables) => {
      updateFollowStateInPostLikesCaches({
        queryClient,
        userId: variables.userId,
        following: response.following,
      })
    },
  })
}