import { LIMIT_PAGE } from "@/constants"
import { FollowResponseData, FollowUsersResponse, GetFollowUsersParams } from "@/features/follow/types"
import { api } from "@/lib/http/api"


export const followUser = async (username: string) => {
  return api<FollowResponseData>({
    method: "POST",
    url: `/follow/${username}`,
  })
}

export const unfollowUser = async (username: string) => {
  return api<FollowResponseData>({
    method: "DELETE",
    url: `/follow/${username}`,
  })
}

export const getUserFollowers = async ({
  username,
  page = 1,
  limit = LIMIT_PAGE,
}: GetFollowUsersParams): Promise<FollowUsersResponse> => {
  const res = await api<FollowUsersResponse>({
    method: 'GET',
    url: `/users/${username}/followers`,
    params: { page, limit },
  })

  return res
}

export const getUserFollowing = async ({
  username,
  page = 1,
  limit = LIMIT_PAGE,
}: GetFollowUsersParams): Promise<FollowUsersResponse> => {
  const res = await api<FollowUsersResponse>({
    method: 'GET',
    url: `/users/${username}/following`,
    params: { page, limit },
  })

  return res
}