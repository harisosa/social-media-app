import { User } from "@/features/user/types"
import { Pagination } from "@/types"

export type PostComment = {
  id: number
  text: string
  createdAt: string
  author: User
  isMine: boolean
}


export type PostCommentsResponse = {
  comments: PostComment[]
  pagination: Pagination
}

export type CreateCommentPayload = {
    postId: number
  text: string
}

export type GetPostCommentsParams = {
  postId: number
  page: number
  limit: number
}
