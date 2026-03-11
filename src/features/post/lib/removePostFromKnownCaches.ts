import { QueryClient } from '@tanstack/react-query'
import { timelineQueryKeys } from '@/features/timeline/queryKeys'
import { usersQueryKeys } from '@/features/user/queryKeys'

import {
  InfiniteItemsData,
  removePostFromInfiniteData,
} from './removePostFromInfiniteData'
import { LIMIT_PAGE } from '@/constants'

type PostItem = {
  id: number
}

export const removePostFromKnownCaches = ({
  queryClient,
  postId,
  username,
}: {
  queryClient: QueryClient
  postId: number
  username?: string
}) => {
  queryClient.setQueryData(
    timelineQueryKeys.infinite(LIMIT_PAGE),
    (oldData: InfiniteItemsData<PostItem> | undefined) =>
      removePostFromInfiniteData(oldData, postId),
  )

  queryClient.setQueryData(
    timelineQueryKeys.exploreInfinite(LIMIT_PAGE),
    (oldData: InfiniteItemsData<PostItem> | undefined) =>
      removePostFromInfiniteData(oldData, postId),
  )

  queryClient.setQueryData(
    usersQueryKeys.myPosts(LIMIT_PAGE),
    (oldData: InfiniteItemsData<PostItem> | undefined) =>
      removePostFromInfiniteData(oldData, postId),
  )

  queryClient.setQueryData(
    usersQueryKeys.mySavedPosts(LIMIT_PAGE),
    (oldData: InfiniteItemsData<PostItem> | undefined) =>
      removePostFromInfiniteData(oldData, postId),
  )

  if (username) {
    queryClient.setQueryData(
      usersQueryKeys.posts(username, LIMIT_PAGE),
      (oldData: InfiniteItemsData<PostItem> | undefined) =>
        removePostFromInfiniteData(oldData, postId),
    )

    queryClient.setQueryData(
      usersQueryKeys.likes(username, LIMIT_PAGE),
      (oldData: InfiniteItemsData<PostItem> | undefined) =>
        removePostFromInfiniteData(oldData, postId),
    )
  }
}