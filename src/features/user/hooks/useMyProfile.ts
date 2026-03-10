'use client'

import { getMyProfile } from '@/features/user/api'
import { usersQueryKeys } from '@/features/user/queryKeys'
import { useQuery } from '@tanstack/react-query'

export const useMyProfile = () => {
  return useQuery({
    queryKey: usersQueryKeys.myProfile(),
    queryFn: getMyProfile,
  })
}