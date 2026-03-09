"use client"

import { useInfiniteQuery } from "@tanstack/react-query"

import { getTimeline } from "../api/timeline.api"
import { timelineQueryKeys } from "../queryKeys"
import type { GetPostResponse } from "../types"

type UseTimelineInfiniteParams = {
  limit?: number
}

export const useTimelineInfinite = ({
  limit = 20,
}: UseTimelineInfiniteParams = {}) => {
  return useInfiniteQuery({
    queryKey: timelineQueryKeys.infinite(limit),
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getTimeline({
        page: pageParam,
        limit,
      }),
    getNextPageParam: (lastPage: GetPostResponse) => {
      const { page, totalPages } = lastPage.pagination
      return page < totalPages ? page + 1 : undefined
    },
  })
}