import { LIMIT_PAGE, STALE_TIME } from '@/constants'
import { getUserLikedPosts } from '@/features/user/api'
import { usersQueryKeys } from '@/features/user/queryKeys'
import { useInfiniteQuery } from '@tanstack/react-query'


type UseUserLikedPostsInfiniteParams = {
  username: string
  limit?: number
}

export const useUserLikedPostsInfinite = ({
  username,
  limit = LIMIT_PAGE,
}: UseUserLikedPostsInfiniteParams) => {
  return useInfiniteQuery({
    queryKey: usersQueryKeys.likes(username, limit),
    staleTime: STALE_TIME,
    queryFn: ({ pageParam = 1 }) =>
      getUserLikedPosts({
        username,
        page: pageParam,
        limit,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination
      return page < totalPages ? page + 1 : undefined
    },
    enabled: Boolean(username),
  })
}