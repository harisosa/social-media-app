import type { QueryClient } from '@tanstack/react-query'
import type { QuerySnapshot } from '@/features/follow/lib/types'

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