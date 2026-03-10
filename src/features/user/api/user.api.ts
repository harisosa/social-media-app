import { GetPostResponse } from '@/features/timeline/types'
import { GetUserProfileParams, UserProfileResponse } from '@/features/user/types'
import { api } from '@/lib/http'


export const getUserProfile = async (username: string) : Promise<UserProfileResponse>=> {
  return await api<UserProfileResponse>({
    method: 'GET',
    url: `/users/${username}`,
  })
}

export const getUserPosts = async ({
  username,
  page = 1,
  limit = 9,
}: GetUserProfileParams) => {
  return await api<GetPostResponse>({
    method: 'GET',
    url: `/users/${username}/posts`,
    params: { page, limit },
  })
}

export const getUserLikedPosts = async ({
  username,
  page = 1,
  limit = 20,
}: GetUserProfileParams) => {
  return await api<GetPostResponse>({
    method: 'GET',
    url: `/users/${username}/likes`,
    params: { page, limit },
  })
}