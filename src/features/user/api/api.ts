import { api } from "@/lib/http"
import type { SearchUsersParams, SearchUsersResponse } from "../types"

export const searchUsers = (params: SearchUsersParams) => {
  return api<SearchUsersResponse>({
    method: "GET",
    url: "/users/search",
    params,
  })
}