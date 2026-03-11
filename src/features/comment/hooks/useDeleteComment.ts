"use client"

import { InfiniteData, useMutation } from "@tanstack/react-query"

import { deleteComment } from "@/features/comment/api/api"
import { commentsQueryKeys } from "@/features/comment/queryKeys"
import type {
  DeleteCommentResponse,
  PostComment,
  PostCommentsResponse,
} from "@/features/comment/types"
import type { PostModel } from "@/features/post/types"
import { postQueryKeys } from "@/features/post/queryKeys"
import { queryClient } from "@/lib/query"
import { appToast } from "@/lib/toast"
import { LIMIT_PAGE } from "@/constants"

type DeleteCommentVariables = {
  commentId: number
}

type DeleteCommentContext = {
  previousComments?: InfiniteData<PostCommentsResponse>
  previousPostDetail?: PostModel
  deletedComment?: PostComment
}

export const useDeleteComment = (
  postId: number,
) => {
  return useMutation<
    DeleteCommentResponse,
    Error,
    DeleteCommentVariables,
    DeleteCommentContext
  >({
    mutationFn: ({ commentId }) => deleteComment(commentId),

    onMutate: async ({ commentId }) => {
      await queryClient.cancelQueries({
        queryKey: commentsQueryKeys.list(postId, LIMIT_PAGE),
      })

      await queryClient.cancelQueries({
        queryKey: postQueryKeys.detail(postId),
      })

      const previousComments =
        queryClient.getQueryData<InfiniteData<PostCommentsResponse>>(
          commentsQueryKeys.list(postId, LIMIT_PAGE)
        )

      const previousPostDetail = queryClient.getQueryData<PostModel>(
        postQueryKeys.detail(postId)
      )

      let deletedComment: PostComment | undefined
      let didDelete = false

      queryClient.setQueryData<InfiniteData<PostCommentsResponse>>(
        commentsQueryKeys.list(postId, LIMIT_PAGE),
        (old) => {
          if (!old) {
            return old
          }

          const nextPages = old.pages.map((page) => {
            const target = page.comments.find((comment) => comment.id === commentId)

            if (!target) {
              return page
            }

            deletedComment = target
            didDelete = true

            return {
              ...page,
              comments: page.comments.filter((comment) => comment.id !== commentId),
              pagination: {
                ...page.pagination,
                total: Math.max(0, page.pagination.total - 1),
              },
            }
          })

          return {
            ...old,
            pages: nextPages,
          }
        }
      )

      if (didDelete) {
        queryClient.setQueryData<PostModel>(postQueryKeys.detail(postId), (old) => {
          if (!old) {
            return old
          }

          return {
            ...old,
            commentCount: Math.max(0, old.commentCount - 1),
          }
        })
      }

      return {
        previousComments,
        previousPostDetail,
        deletedComment,
      }
    },

    onError: (_error, _variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(
          commentsQueryKeys.list(postId, LIMIT_PAGE),
          context.previousComments
        )
      }

      if (context?.previousPostDetail) {
        queryClient.setQueryData(
          postQueryKeys.detail(postId),
          context.previousPostDetail
        )
      }

      appToast.error("Failed to delete comment")
    },

    onSuccess: (response) => {
      if (response.deleted) {
        appToast.success("Comment deleted")
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: commentsQueryKeys.byPost(postId),
      })

      await queryClient.invalidateQueries({
        queryKey: postQueryKeys.detail(postId),
      })
    },
  })
}