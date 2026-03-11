import type { QueryClient } from '@tanstack/react-query'
import { usersQueryKeys } from '@/features/user/queryKeys'
import type { QuerySnapshot } from '@/features/follow/lib/types'

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