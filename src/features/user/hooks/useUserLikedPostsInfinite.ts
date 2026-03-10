import { getUserLikedPosts } from '@/features/user/api'
import { usersQueryKeys } from '@/features/user/queryKeys'
import { useInfiniteQuery } from '@tanstack/react-query'


type UseUserLikedPostsInfiniteParams = {
  username: string
  limit?: number
}

export const useUserLikedPostsInfinite = ({
  username,
  limit = 9,
}: UseUserLikedPostsInfiniteParams) => {
  return useInfiniteQuery({
    queryKey: usersQueryKeys.likes(username, limit),
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