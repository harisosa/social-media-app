'use client'

import {  STALE_TIME_PROFILE } from '@/constants'
import { getMyProfile } from '@/features/user/api'
import { usersQueryKeys } from '@/features/user/queryKeys'
import { useQuery } from '@tanstack/react-query'

export const useMyProfile = <TData = Awaited<ReturnType<typeof getMyProfile>>>(
  select?: (data: Awaited<ReturnType<typeof getMyProfile>>) => TData,
) => {
  return useQuery({
    queryKey: usersQueryKeys.myProfile(),
    staleTime: STALE_TIME_PROFILE,
    queryFn: getMyProfile,
    select,
  })
}