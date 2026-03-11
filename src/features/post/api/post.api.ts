import { api } from "@/lib/http"

import { CreatePostPayload, DeletePostResponse, PostModel } from "../types"

export const getPostDetail = (postId: number) =>
  api<PostModel>({
    method: "GET",
    url: `/posts/${postId}`,
  })

export const createPost = async (
  payload: CreatePostPayload
): Promise<PostModel> => {
  const formData = new FormData()

  formData.append('image', payload.image)
  formData.append('caption', payload.caption)

  return api<PostModel>({
    method: 'POST',
    url: '/posts',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const deletePost = (postId: number) =>{
  return api<DeletePostResponse>({
    method: 'DELETE',
    url: `/posts/${postId}`,
})
}
