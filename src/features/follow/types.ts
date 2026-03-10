import { User } from "@/features/user/types"
import { Pagination, PaginationParams } from "@/types"

export type FollowResponseData = {
  following: boolean
}


export type FollowUser = User & {
  isFollowedByMe: boolean
}

export type FollowUsersResponse = {
  users: FollowUser[]
  pagination: Pagination
}

export type GetFollowUsersParams = PaginationParams &{
  username: string
}