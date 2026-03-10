import { api } from "@/lib/http"
import type { GetPostResponse } from "../types"
import { LIMIT_PAGE } from "@/constants"
import { PaginationParams } from "@/types"

export const getTimeline = async ({
  page = 1,
  limit = LIMIT_PAGE,
}: PaginationParams): Promise<GetPostResponse> => {
  return api<GetPostResponse>({
    method: "GET",
    url: "/feed",
    params: {
      page,
      limit,
    },
  })
}

export const getExplorePosts = async (params: PaginationParams): Promise<GetPostResponse> => {
 return await api<GetPostResponse>({
    method: 'GET',
    url: '/posts',
    params,
  })
}