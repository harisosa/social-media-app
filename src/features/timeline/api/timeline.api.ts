import { api } from "@/lib/http"
import type { TimelineResponse } from "../types"

type GetTimelineParams = {
  page?: number
  limit?: number
}

export const getTimeline = async ({
  page = 1,
  limit = 20,
}: GetTimelineParams = {}): Promise<TimelineResponse> => {
  return api<TimelineResponse>({
    method: "GET",
    url: "/feed",
    params: {
      page,
      limit,
    },
  })
}