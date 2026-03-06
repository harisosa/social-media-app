export type TimelineAuthor = {
  id: number
  username: string
  name: string
  avatarUrl: string | null
}

export type TimelinePost = {
  id: number
  imageUrl: string
  caption: string
  createdAt: string
  author: TimelineAuthor
  likeCount: number
  commentCount: number
  likedByMe: boolean
}

export type TimelinePagination = {
  page: number
  limit: number
  total: number
  totalPages: number
}

export type TimelineResponse = {
  items: TimelinePost[]
  pagination: TimelinePagination
}

export type GetTimelineParams = {
  page?: number
  limit?: number
}