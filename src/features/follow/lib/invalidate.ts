import { followQueryKeys } from '@/features/follow/queryKeys'
import type { QueryClient } from '@tanstack/react-query'

export const invalidateUserFollowLists = ({
  queryClient,
  username,
}: {
  queryClient: QueryClient
  username: string
}) => {
  queryClient.invalidateQueries({
    queryKey: followQueryKeys.followers(username),
  })

  queryClient.invalidateQueries({
    queryKey: followQueryKeys.following(username),
  })
}