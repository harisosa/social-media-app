'use client'

import { STALE_TIME } from '@/constants'
import { getMyProfile } from '@/features/user/api'
import { usersQueryKeys } from '@/features/user/queryKeys'
import { useQuery } from '@tanstack/react-query'

export const useMyProfile = () => {
  return useQuery({
    queryKey: usersQueryKeys.myProfile(),
    staleTime: STALE_TIME,
    queryFn: getMyProfile,
  })
}