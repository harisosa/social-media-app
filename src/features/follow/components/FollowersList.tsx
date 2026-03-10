'use client'

import React from 'react'

import { LIMIT_PAGE } from '@/constants'
import { FollowListContent } from './FollowListContent'
import { useUserFollowersInfinite } from '@/features/follow/hooks'

type FollowersListProps = {
  username: string
}

export const FollowersList: React.FC<FollowersListProps> = ({ username }) => {
  const query = useUserFollowersInfinite({
    username,
    page:1,
    limit: LIMIT_PAGE,
  })

  return (
    <FollowListContent
      title="Followers"
      emptyLabel="No followers yet"
      errorLabel="Failed to load followers"
      data={query.data}
      isPending={query.isPending}
      isError={query.isError}
      hasNextPage={query.hasNextPage}
      isFetchingNextPage={query.isFetchingNextPage}
      fetchNextPage={query.fetchNextPage}
    />
  )
}