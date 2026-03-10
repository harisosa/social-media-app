import { useQuery } from '@tanstack/react-query'
import { usersQueryKeys } from '@/features/user/queryKeys'
import { getUserProfile } from '@/features/user/api'


export const useUserProfile = (username: string) => {
  return useQuery({
    queryKey: usersQueryKeys.profile(username),
    queryFn: () => getUserProfile(username),
    enabled: Boolean(username),
  })
}