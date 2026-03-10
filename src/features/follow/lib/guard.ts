import { LikesPage } from '@/features/follow/lib/types'
import type { InfiniteData } from '@tanstack/react-query'


export const isLikesInfiniteData = (
  value: unknown
): value is InfiniteData<LikesPage> => {
  if (!value || typeof value !== 'object') {
    return false
  }

  const candidate = value as InfiniteData<LikesPage>

  return Array.isArray(candidate.pages)
}