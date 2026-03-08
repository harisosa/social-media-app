import { FollowResponseData } from "@/features/follow/types"
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