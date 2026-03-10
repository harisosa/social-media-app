import type { InfiniteData, QueryKey } from '@tanstack/react-query'

export type LikesUser = {
  id: number
  name: string
  username: string
  avatarUrl: string | null
  isFollowedByMe: boolean
}

export type LikesPage = {
  users: LikesUser[]
  pagination?: unknown
}

export type LikesInfiniteData = InfiniteData<LikesPage>

export type QuerySnapshot = [QueryKey, unknown]