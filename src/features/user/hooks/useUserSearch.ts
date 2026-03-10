import { useInfiniteQuery } from "@tanstack/react-query"
import { searchUsers } from "@/features/user/api"
import { usersQueryKeys } from "@/features/user/queryKeys"
import { STALE_TIME } from "@/constants"

interface Params {
  q: string
  limit?: number
}

export const useUserSearch = ({ q, limit = 20 }: Params) => {
  return useInfiniteQuery({
    queryKey: usersQueryKeys.search(q),
    staleTime: STALE_TIME,
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