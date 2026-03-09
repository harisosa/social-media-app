import { api } from "@/lib/http"
import type { GetPostResponse } from "../types"

type GetTimelineParams = {
  page?: number
  limit?: number
}

export const getTimeline = async ({
  page = 1,
  limit = 20,
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