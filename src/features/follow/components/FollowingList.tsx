'use client'

import React from 'react'

import { LIMIT_PAGE } from '@/constants'
import { useUserFollowingInfinite } from '@/features/follow/hooks'
import { FollowListContent } from './FollowListContent'

type FollowingListProps = {
  username: string
}

export const FollowingList: React.FC<FollowingListProps> = ({ username }) => {
  const query = useUserFollowingInfinite({
    username,
    page: 1,
    limit: LIMIT_PAGE,
  })

  return (
    <FollowListContent
      title="Following"
      emptyLabel="No following yet"
      errorLabel="Failed to load following"
      data={query.data}
      isPending={query.isPending}
      isError={query.isError}
      hasNextPage={query.hasNextPage}
      isFetchingNextPage={query.isFetchingNextPage}
      fetchNextPage={query.fetchNextPage}
    />
  )
}