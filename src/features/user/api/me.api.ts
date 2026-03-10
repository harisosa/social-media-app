import { api } from "@/lib/http"
import type { MyProfileResponse, SearchUsersParams, SearchUsersResponse } from "../types"
import { GetPostResponse } from "@/features/timeline/types"
import { PaginationParams } from "@/types"

export const searchUsers = (params: SearchUsersParams) => {
  return api<SearchUsersResponse>({
    method: "GET",
    url: "/users/search",
    params,
  })
}

export const getMyProfile = async (): Promise<MyProfileResponse> => {
  return await api<MyProfileResponse>({
    method: 'GET',
    url: '/me',
  })
}

export const getMyPosts = async ({
  page,
  limit,
}: PaginationParams): Promise<GetPostResponse> => {
  return await api<GetPostResponse>({
    method: 'GET',
    url: '/me/posts',
    params: {
      page,
      limit,
    },
  })

}


export const getMySavedPosts = async ({
  page,
  limit,
}: PaginationParams): Promise<GetPostResponse> => {
  return await api<GetPostResponse>({
    method: 'GET',
    url: '/me/saved',
    params: {
      page,
      limit,
    },
  })
}