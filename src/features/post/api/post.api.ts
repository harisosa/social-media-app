import { api } from "@/lib/http"

import { PostDetail } from "../types"

export const getPostDetail = (postId: number) =>
  api<PostDetail>({
    method: "GET",
    url: `/posts/${postId}`,
  })