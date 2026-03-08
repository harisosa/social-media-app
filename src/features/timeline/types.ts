import { PostModel } from "@/features/post/types"
import { Pagination } from "@/types"

export type TimelineResponse = {
  items: PostModel[]
  pagination: Pagination
}

export type GetTimelineParams = {
  page?: number
  limit?: number
}