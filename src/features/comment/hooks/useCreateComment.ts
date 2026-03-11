"use client"

import { useMutation } from "@tanstack/react-query"

import { createComment } from "@/features/comment/api/api"
import type { PostComment } from "@/features/comment/types"
import {
  applyOptimisticCommentList,
  getCreateCommentSnapshot,
  incrementPostDetailCommentCount,
  replaceOptimisticComment,
  restoreCreateCommentSnapshot,
  updateCommentCountCache,
  type CreateCommentCacheSnapshot,
} from "@/features/comment/lib"
import { useMyProfile } from "@/features/user/hooks"

export const useCreateComment = (postId: number) => {
  const { data: profile } = useMyProfile()
  const authUser = profile?.profile

  return useMutation<PostComment, Error, string, CreateCommentCacheSnapshot>({
    mutationFn: (text) =>
      createComment({
        postId,
        text,
      }),

    onMutate: async (text) => {
      const snapshot = getCreateCommentSnapshot(postId)

      if (!authUser) {
        return snapshot
      }

      const optimisticComment: PostComment = {
        id: -Date.now(),
        text,
        createdAt: new Date().toISOString(),
        author: authUser,
        isMine: true,
      }

      applyOptimisticCommentList(postId, optimisticComment)
      incrementPostDetailCommentCount(postId, 1)
      updateCommentCountCache(postId, 1)

      return snapshot
    },

    onError: (err) => {
      console.log(err)
      restoreCreateCommentSnapshot(postId)
    },

    onSuccess: (createdComment) => {
      replaceOptimisticComment(postId, createdComment)
    },
  })
}