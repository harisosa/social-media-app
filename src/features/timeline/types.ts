import { PostModel } from "@/features/post/types"

export type TimelinePagination = {
  page: number
  limit: number
  total: number
  totalPages: number
}

export type TimelineResponse = {
  items: PostModel[]
  pagination: TimelinePagination
}

export type GetTimelineParams = {
  page?: number
  limit?: number
}