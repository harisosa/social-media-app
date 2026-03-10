import type { QueryClient } from '@tanstack/react-query'
import { postQueryKeys } from '@/features/post/queryKeys'
import { usersQueryKeys } from '@/features/user/queryKeys'
import { QuerySnapshot } from '@/features/follow/lib/types'

export const getLikesCachesSnapshots = ({
  queryClient,
}: {
  queryClient: QueryClient
}): QuerySnapshot[] => {
  const snapshots = queryClient.getQueriesData({
    queryKey: postQueryKeys.all,
  }) as QuerySnapshot[]

  return snapshots
}

export const getUserProfileFollowSnapshot = ({
  queryClient,
  username,
}: {
  queryClient: QueryClient
  username: string
}): QuerySnapshot => {
  const queryKey = usersQueryKeys.profile(username)
  const data = queryClient.getQueryData(queryKey)

  return [queryKey, data]
}

export const rollbackFollowSnapshots = ({
  queryClient,
  snapshots,
}: {
  queryClient: QueryClient
  snapshots: QuerySnapshot[]
}) => {
  snapshots.forEach(([queryKey, data]) => {
    queryClient.setQueryData(queryKey, data)
  })
}