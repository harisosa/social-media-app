import type { QueryClient } from '@tanstack/react-query'
import { postQueryKeys } from '@/features/post/queryKeys'
import type { QuerySnapshot } from '@/features/follow/lib/types'
import { isLikesQueryKey } from '@/features/follow/lib/cache/isLikesQueryKey'

export const getLikesCachesSnapshots = ({
  queryClient,
}: {
  queryClient: QueryClient
}): QuerySnapshot[] => {
  const snapshots = queryClient.getQueriesData({
    queryKey: postQueryKeys.all,
  }) as QuerySnapshot[]

  return snapshots.filter(([queryKey]) => {
    if (!Array.isArray(queryKey)) {
      return false
    }

    return isLikesQueryKey(queryKey)
  })
}