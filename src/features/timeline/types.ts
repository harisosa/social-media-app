import { PostModel } from "@/features/post/types"
import { Pagination } from "@/types"

export type TimelineScope = 'feed' | 'explore'

export type GetPostResponse = {
  items: PostModel[];
  posts: PostModel[];
  pagination: Pagination;
}

export type GetTimelineParams = {
  page?: number
  limit?: number
}