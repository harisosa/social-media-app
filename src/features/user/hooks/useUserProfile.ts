import { useQuery } from '@tanstack/react-query'
import { usersQueryKeys } from '@/features/user/queryKeys'
import { getUserProfile } from '@/features/user/api'
import { STALE_TIME } from '@/constants'


export const useUserProfile = (username: string) => {
  return useQuery({
    queryKey: usersQueryKeys.profile(username),
    queryFn: () => getUserProfile(username),
    staleTime: STALE_TIME,
    enabled: Boolean(username),
  })
}