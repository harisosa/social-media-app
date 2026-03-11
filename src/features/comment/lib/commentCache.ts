import { InfiniteData } from "@tanstack/react-query"

import type { PostComment, PostCommentsResponse } from "@/features/comment/types"
import type { PostModel } from "@/features/post/types"
import { commentsQueryKeys } from "@/features/comment/queryKeys"
import { postQueryKeys } from "@/features/post/queryKeys"
import { queryClient } from "@/lib/query"
import { LIMIT_PAGE } from "@/constants"

export type CreateCommentCacheSnapshot = {
  previousComments?: InfiniteData<PostCommentsResponse>
  previousPostDetail?: PostModel
}

export const getCreateCommentSnapshot = (
  postId: number
): CreateCommentCacheSnapshot => {
  const previousComments =
    queryClient.getQueryData<InfiniteData<PostCommentsResponse>>(
      commentsQueryKeys.list(postId, LIMIT_PAGE)
    )

  const previousPostDetail = queryClient.getQueryData<PostModel>(
    postQueryKeys.detail(postId)
  )

  return {
    previousComments,
    previousPostDetail,
  }
}

export const applyOptimisticCommentList = (
  postId: number,
  optimisticComment: PostComment
) => {
  queryClient.setQueryData<InfiniteData<PostCommentsResponse>>(
    commentsQueryKeys.list(postId, LIMIT_PAGE),
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
}

export const replaceOptimisticComment = (
  postId: number,
  createdComment: PostComment
) => {
  queryClient.setQueryData<InfiniteData<PostCommentsResponse>>(
    commentsQueryKeys.list(postId, LIMIT_PAGE),
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
}

export const incrementPostDetailCommentCount = (postId: number, delta: number) => {
  queryClient.setQueryData<PostModel>(postQueryKeys.detail(postId), (old) => {
    if (!old) {
      return old
    }

    return {
      ...old,
      commentCount: old.commentCount + delta,
    }
  })
}

export const restoreCreateCommentSnapshot = (
  postId: number,
  snapshot?: CreateCommentCacheSnapshot
) => {
  if (snapshot?.previousComments) {
    queryClient.setQueryData(
      commentsQueryKeys.list(postId, LIMIT_PAGE),
      snapshot.previousComments
    )
  }

  if (snapshot?.previousPostDetail) {
    queryClient.setQueryData(
      postQueryKeys.detail(postId),
      snapshot.previousPostDetail
    )
  }
}