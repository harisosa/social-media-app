import { LIMIT_PAGE } from '@/constants'
import { getUserPosts } from '@/features/user/api'
import { usersQueryKeys } from '@/features/user/queryKeys'
import { useInfiniteQuery } from '@tanstack/react-query'



type UseUserPostsInfiniteParams = {
  username: string
  limit?: number
}

export const useUserPostsInfinite = ({
  username,
  limit = LIMIT_PAGE,
}: UseUserPostsInfiniteParams) => {
  return useInfiniteQuery({
    queryKey: usersQueryKeys.posts(username, limit),
    queryFn: ({ pageParam = 1 }) =>
      getUserPosts({
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