"use client"

import { InfiniteData, useMutation } from "@tanstack/react-query"

import type { PostDetail } from "@/features/post/types"
import { PostComment, PostCommentsResponse } from "@/features/comment/types"
import { createComment } from "@/features/comment/api/api"
import { commentsQueryKeys } from "@/features/comment/queryKeys"
import { postQueryKeys } from "@/features/post/queryKeys"
import { queryClient } from "@/lib/query"
import { useMyProfile } from "@/features/user/hooks"
import { LIMIT_PAGE } from "@/constants"
import { appToast } from "@/lib/toast"


type MutationContext = {
  previousComments?: InfiniteData<PostCommentsResponse>
  previousPostDetail?: PostDetail
}

export const useCreateComment = (postId: number, limit: number = LIMIT_PAGE) => {
  const {data : profile} =  useMyProfile();
  const authUser = profile?.profile;
  return useMutation<PostComment, Error, string, MutationContext>({
    mutationFn: (text) =>
      createComment({
        postId,
        text,
      }),

    onMutate: async (text) => {
      await queryClient.cancelQueries({
        queryKey: commentsQueryKeys.list(postId, limit),
      })

      await queryClient.cancelQueries({
        queryKey: postQueryKeys.detail(postId),
      })

      const previousComments =
        queryClient.getQueryData<InfiniteData<PostCommentsResponse>>(
          commentsQueryKeys.list(postId, limit)
        )

      const previousPostDetail = queryClient.getQueryData<PostDetail>(
        postQueryKeys.detail(postId)
      )

      if (!authUser) {
        return {
          previousComments,
          previousPostDetail,
        }
      }

      const optimisticComment: PostComment = {
        id: -Date.now(),
        text,
        createdAt: new Date().toISOString(),
        author:  authUser,
        isMine: true,
      }

      queryClient.setQueryData<InfiniteData<PostCommentsResponse>>(
        commentsQueryKeys.list(postId, limit),
        (old) => {
          if (!old || old.pages.length === 0) {
            return old
          }

          const firstPage = old.pages[0]

          return {
            ...old,
            pages: [
              {
                ...firstPage,
                comments: [optimisticComment, ...firstPage.comments],
                pagination: {
                  ...firstPage.pagination,
                  total: firstPage.pagination.total + 1,
                },
              },
              ...old.pages.slice(1),
            ],
          }
        }
      )

      queryClient.setQueryData<PostDetail>(postQueryKeys.detail(postId), (old) => {
        if (!old) {
          return old
        }

        return {
          ...old,
          commentCount: old.commentCount + 1,
        }
      })

      return {
        previousComments,
        previousPostDetail,
      }
    },

    onError: (_error, _text, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(
          commentsQueryKeys.list(postId, limit),
          context.previousComments
        )
      }

      if (context?.previousPostDetail) {
        queryClient.setQueryData(
          postQueryKeys.detail(postId),
          context.previousPostDetail
        )
      }

      if(!authUser){
        appToast.error('Please Login before comment')
      }
    },

    onSuccess: (createdComment) => {
      queryClient.setQueryData<InfiniteData<PostCommentsResponse>>(
        commentsQueryKeys.list(postId, limit),
        (old) => {
          if (!old || old.pages.length === 0) {
            return old
          }

          const firstPage = old.pages[0]

          return {
            ...old,
            pages: [
              {
                ...firstPage,
                comments: [
                  createdComment,
                  ...firstPage.comments.filter((comment) => comment.id >= 0),
                ],
              },
              ...old.pages.slice(1),
            ],
          }
        }
      )
    },
  })
}