import { TogglePostSaveData } from "@/features/post/types"
import { api } from "@/lib/http"

type TogglePostSaveParams = {
  postId: number
}

export const savePost = async ({
  postId,
}: TogglePostSaveParams): Promise<TogglePostSaveData> => {
  return api<TogglePostSaveData>({
    method: "POST",
    url: `/posts/${postId}/save`,
  })
}

export const unsavePost = async ({
  postId,
}: TogglePostSaveParams): Promise<TogglePostSaveData> => {
  return api<TogglePostSaveData>({
    method: "DELETE",
    url: `/posts/${postId}/save`,
  })
}