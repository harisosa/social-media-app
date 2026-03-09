import { PostModel } from "@/features/post/types"
import { Pagination } from "@/types"

export type GetPostResponse = {
  items: PostModel[]
  pagination: Pagination
}

export type GetTimelineParams = {
  page?: number
  limit?: number
}