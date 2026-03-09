import { useInfiniteQuery } from "@tanstack/react-query"

import { usersQueryKeys } from "../queryKeys"
import { searchUsers } from "@/features/user/api"

interface Params {
  q: string
  limit?: number
}

export const useUserSearch = ({ q, limit = 20 }: Params) => {
  return useInfiniteQuery({
    queryKey: usersQueryKeys.search(q),

    queryFn: ({ pageParam = 1 }) =>
      searchUsers({
        q,
        page: pageParam,
        limit,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination
      return page < totalPages ? page + 1 : undefined
    },

    enabled: q.length > 0,
  })
}