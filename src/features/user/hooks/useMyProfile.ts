'use client'

import { useQuery } from '@tanstack/react-query'
import { getMyProfile } from '../api'
import { usersQueryKeys } from '../queryKeys'

export const useMyProfile = () => {
  return useQuery({
    queryKey: usersQueryKeys.myProfile(),
    queryFn: getMyProfile,
  })
}