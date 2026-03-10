import { api } from "@/lib/http"
import { User, type MyProfileResponse, type SearchUsersParams, type SearchUsersResponse, type UpdateProfilePayload } from "../types"
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


export const updateProfile = async (payload: UpdateProfilePayload) => {
  const formData = new FormData()

  if (payload.name) formData.append('name', payload.name)
  if (payload.username) formData.append('username', payload.username)
  if (payload.phone) formData.append('name', payload.phone)
  if (payload.bio) formData.append('bio', payload.bio)
  

  if (payload.avatar) {
    formData.append('avatar', payload.avatar)
  }

  return api<User>({
    method: 'PATCH',
    url: '/me',
    data: formData,
  })
}