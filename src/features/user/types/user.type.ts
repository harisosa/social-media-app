import { Pagination } from "@/types"

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
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

export type MyProfileStats = {
  posts: number
  followers: number
  following: number
  likes: number
}

export type MeResponse = {
  profile: UserProfile
  stats: MyProfileStats
}
