import { api } from "@/lib/http"
import type { GetPostResponse } from "../types"
import { LIMIT_PAGE } from "@/constants"

type GetTimelineParams = {
  page?: number
  limit?: number
}

export const getTimeline = async ({
  page = 1,
  limit = LIMIT_PAGE,
}: GetTimelineParams = {}): Promise<GetPostResponse> => {
  return api<GetPostResponse>({
    method: "GET",
    url: "/feed",
    params: {
      page,
      limit,
    },
  })
}