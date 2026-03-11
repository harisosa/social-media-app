import { InfiniteData } from "@tanstack/react-query"

import type { GetPostResponse } from "@/features/timeline/types"
import { queryClient } from "@/lib/query"

const TIMELINE_INFINITE_KEY = ["timeline", "infinite"] as const
const EXPLORE_INFINITE_KEY = ["timeline", "feed", "infinite"] as const

const updateCommentCount = <T extends { commentCount: number }>(
  post: T,
  delta: number
): T => ({
  ...post,
  commentCount: post.commentCount + delta,
})

const updatePostCommentCountInPages = (
  old: InfiniteData<GetPostResponse> | undefined,
  postId: number,
  delta: number
): InfiniteData<GetPostResponse> | undefined => {
  if (!old) {
    return old
  }

  return {
    ...old,
    pages: old.pages.map((page) => {
      const nextPage = { ...page }

      if ("posts" in nextPage && Array.isArray(nextPage.posts)) {
        nextPage.posts = nextPage.posts.map((post) =>
          post.id === postId ? updateCommentCount(post, delta) : post
        )
      }

      if ("items" in nextPage && Array.isArray(nextPage.items)) {
        nextPage.items = nextPage.items.map((item) => {
          if (item?.id === postId) {
            return updateCommentCount(item, delta)
          }

          if (item?.id === postId) {
            return {
              ...item,
              post: updateCommentCount(item, delta),
            }
          }

          return item
        })
      }

      return nextPage
    }),
  }
}

export const updateCommentCountCache = (postId: number, delta: number) => {
  queryClient.setQueriesData<InfiniteData<GetPostResponse>>(
    { queryKey: TIMELINE_INFINITE_KEY },
    (old) => updatePostCommentCountInPages(old, postId, delta)
  )

  queryClient.setQueriesData<InfiniteData<GetPostResponse>>(
    { queryKey: EXPLORE_INFINITE_KEY },
    (old) => updatePostCommentCountInPages(old, postId, delta)
  )
}