import type { QueryClient } from '@tanstack/react-query'
import { followQueryKeys } from '@/features/follow/queryKeys'

export const invalidateUserFollowLists = async ({
  queryClient,
  username,
}: {
  queryClient: QueryClient
  username: string
}) => {
  await Promise.all([
    queryClient.invalidateQueries({
      queryKey: followQueryKeys.followers(username),
    }),
    queryClient.invalidateQueries({
      queryKey: followQueryKeys.following(username),
    }),
  ])
}