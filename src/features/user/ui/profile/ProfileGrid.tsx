'use client'

import Image from 'next/image'

import { useInfiniteScroll } from '@/hooks'
import { cn } from '@/lib/utils'

import { ProfileGridState } from './ProfileGridState'
import { ProfileGridEmptyState, ProfileGridItem } from '@/features/user/types'




type ProfileGridProps = {
  items: ProfileGridItem[]
  onItemClick: (id: number) => void
  isLoading?: boolean
  isError?: boolean
  onRetry?: () => void
  emptyState?: ProfileGridEmptyState
  hasNextPage?: boolean
  isFetchingNextPage?: boolean
  onLoadMore?: () => void
  className?: string
}

export const ProfileGrid = ({
  items,
  onItemClick,
  isLoading = false,
  isError = false,
  onRetry,
  emptyState,
  hasNextPage = false,
  isFetchingNextPage = false,
  onLoadMore,
  className,
}: ProfileGridProps) => {
  const { sentinelRef } = useInfiniteScroll({
    enabled: Boolean(hasNextPage) && !isFetchingNextPage && Boolean(onLoadMore),
    onLoadMore: () => {
      onLoadMore?.()
    },
    rootMargin: '200px',
  })


  if (isLoading) {
    return (
      <div className={cn('grid grid-cols-3 gap-1', className)}>
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square w-full animate-pulse bg-white/5"
          />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <ProfileGridState
        variant="error"
        title="Failed to load posts"
        description="Something went wrong while loading this section."
        onAction={onRetry}
        className={className}
      />
    )
  }

  if (!items.length) {
    return (
      <ProfileGridState
        variant="empty"
        title={emptyState?.title ?? 'No posts yet'}
        description={emptyState?.description}
        actionLabel={emptyState?.actionLabel}
        onAction={emptyState?.onAction}
        className={className}
      />
    )
  }

  return (
    <div className={cn('space-y-3', className)}>
      <div className="grid grid-cols-3 gap-1">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onItemClick(item.id)}
            className="relative aspect-square w-full overflow-hidden"
          >
            <Image
              src={item.imageUrl}
              alt={item.alt ?? `Post ${item.id}`}
              fill
              className="object-cover"
              sizes="(max-width:768px) 33vw, 240px"
            />
          </button>
        ))}
      </div>

      {hasNextPage && <div ref={sentinelRef} className="h-1 w-full" />}

      {isFetchingNextPage && (
        <div className="grid grid-cols-3 gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square w-full animate-pulse bg-white/5"
            />
          ))}
        </div>
      )}
    </div>
  )
}