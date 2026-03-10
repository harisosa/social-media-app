import { Pagination, PaginationParams } from "@/types"

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  bio:string;
  phone: string;
  avatarUrl: string | null;
};

export type UserSearchItem = User & {
  isFollowedByMe: boolean
}

export type SearchUsersParams = {
  q: string
  page?: number
  limit?: number
}

export type SearchUsersResponse = {
  users: UserSearchItem[]
  pagination: Pagination
}

export type UserProfile = User & {
  bio: string | null
  createdAt: string
}

export type ProfileStats = {
  posts: number
  post: number
  followers: number
  following: number
  likes: number
}

export type MyProfileResponse = {
  profile: UserProfile
  stats: ProfileStats
}

export type GetUserProfileParams = PaginationParams & {
  username: string;
}


export type UserProfileResponse = User &{
   isFollowing: boolean;
  isMe: boolean;
  counts: ProfileStats
}

export interface UpdateProfilePayload {
  name?: string
  username?: string
  phone?:string
  bio?: string
  avatar?: File | null
}