"use client"

import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query"
import { timelineQueryKeys } from "@/features/timeline/queryKeys"
import type { GetPostResponse } from "@/features/timeline/types"
import { TogglePostSaveData } from "@/features/post/types"
import { savePost, unsavePost } from "@/features/post/api"

type TogglePostSaveParams = {
  postId: number
  isSaved: boolean
}

type TogglePostSaveContext = {
  previousTimelineQueries: Array<
    [readonly unknown[], InfiniteData<GetPostResponse> | undefined]
  >
}

export const useTogglePostSave = () => {
  const queryClient = useQueryClient()

  return useMutation<
    TogglePostSaveData,
    Error,
    TogglePostSaveParams,
    TogglePostSaveContext
  >({
    mutationFn: async ({ postId, isSaved }) => {
      if (isSaved) {
        return unsavePost({ postId })
      }

      return savePost({ postId })
    },

    onMutate: async ({ postId, isSaved }) => {
      await queryClient.cancelQueries({
        queryKey: timelineQueryKeys.all,
      })

      const previousTimelineQueries =
        queryClient.getQueriesData<InfiniteData<GetPostResponse>>({
          queryKey: timelineQueryKeys.all,
        })

      queryClient.setQueriesData<InfiniteData<GetPostResponse>>(
        {
          queryKey: timelineQueryKeys.all,
        },
        (old) => {
          if (!old) {
            return old
          }

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              items: page.items.map((item) => {
                if (item.id !== postId) {
                  return item
                }

                return {
                  ...item,
                  isSaved: !isSaved,
                }
              }),
            })),
          }
        }
      )

      return {
        previousTimelineQueries,
      }
    },

    onError: (_error, _variables, context) => {
      if (!context?.previousTimelineQueries) {
        return
      }

      context.previousTimelineQueries.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data)
      })
    },
  })
}