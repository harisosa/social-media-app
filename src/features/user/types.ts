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