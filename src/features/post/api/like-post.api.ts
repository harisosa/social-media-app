import { PostLikesData, TogglePostLikeData } from "@/features/post/types"
import { api } from "@/lib/http"

type GetPostLikesParams = {
  postId: number
  page?: number
  limit?: number
}


type TogglePostLikeParams = {
  postId: number
}

export const getPostLikes = async ({
  postId,
  page = 1,
  limit = 20,
}: GetPostLikesParams): Promise<PostLikesData> => {
  return api<PostLikesData>({
    method: "GET",
    url: `/posts/${postId}/likes`,
    params: {
      page,
      limit,
    },
  })
}

export const likePost = async ({
  postId,
}: TogglePostLikeParams): Promise<TogglePostLikeData> => {
  return api<TogglePostLikeData>({
    method: "POST",
    url: `/posts/${postId}/like`,
  })
}

export const unlikePost = async ({
  postId,
}: TogglePostLikeParams): Promise<TogglePostLikeData> => {
  return api<TogglePostLikeData>({
    method: "DELETE",
    url: `/posts/${postId}/like`,
  })
}