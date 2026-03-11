import type { InfiniteData } from '@tanstack/react-query'

export type FollowListUser = {
  id: number
  username: string
  isFollowedByMe?: boolean
  isFollowing?: boolean
}

export type FollowListPage = {
  users: FollowListUser[]
}

export const isFollowListInfiniteData = (
  value: unknown
): value is InfiniteData<FollowListPage> => {
  if (!value || typeof value !== 'object') {
    return false
  }

  const candidate = value as InfiniteData<FollowListPage>

  if (!Array.isArray(candidate.pages)) {
    return false
  }

  return candidate.pages.every(page => {
    if (!page || typeof page !== 'object') {
      return false
    }

    return Array.isArray(page.users)
  })
}