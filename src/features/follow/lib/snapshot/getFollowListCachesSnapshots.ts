import type { QueryClient } from '@tanstack/react-query'
import { followQueryKeys } from '@/features/follow/queryKeys'
import type { QuerySnapshot } from '@/features/follow/lib/types'
import { isFollowListQueryKey } from '@/features/follow/lib/cache'

export const getFollowListCachesSnapshots = ({
  queryClient,
}: {
  queryClient: QueryClient
}): QuerySnapshot[] => {
  const snapshots = queryClient.getQueriesData({
    queryKey: followQueryKeys.all,
  }) as QuerySnapshot[]

  return snapshots.filter(([queryKey]) => {
    if (!Array.isArray(queryKey)) {
      return false
    }

    return isFollowListQueryKey(queryKey)
  })
}