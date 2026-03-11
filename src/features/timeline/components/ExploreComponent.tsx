'use client'

import { TimelineErrorState, TimelineListSkeleton } from '@/features/timeline/ui'
import { openOverlay } from '@/features/ui/store'
import { useAppDispatch } from '@/lib/hook'
import { useInfiniteScroll } from '@/hooks'

import { TimelineEmptyState } from '../ui/TimelineEmptyState'
import { TimelineList } from '../ui/TimelineList'
import { LIMIT_PAGE } from '@/constants'
import { useExplorePostsInfinite } from '@/features/timeline/hooks'

export const ExploreComponent = () => {
  const dispatch = useAppDispatch()

  const {
    data,
    isPending,
    isError,
    error,
    refetch,
    isRefetching,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useExplorePostsInfinite({
    limit: LIMIT_PAGE,
  })

  const posts = data?.pages.flatMap(page => page.posts) ?? []

  const { sentinelRef } = useInfiniteScroll({
    enabled: Boolean(hasNextPage) && !isFetchingNextPage,
    onLoadMore: () => {
      void fetchNextPage()
    },
    rootMargin: '200px',
  })

  const handleOpenLikes = (postId: number) => {
    dispatch(
      openOverlay({
        type: 'likes',
        payload: { postId },
        size: 'md',
      })
    )
  }

  const handleOpenComments = (postId: number) => {
    dispatch(
      openOverlay({
        type: 'post-detail',
        payload: { postId },
        size: 'lg',
      })
    )
  }

  const handleShare = (postId: number) => {
    console.log('share post', postId)
  }

  if (isPending) {
    return (
      <section>
        <TimelineListSkeleton />
      </section>
    )
  }

  if (isError) {
    return (
      <section>
        <TimelineErrorState
          message={
            error instanceof Error
              ? error.message
              : 'Something went wrong while loading posts.'
          }
          onRetry={() => {
            void refetch()
          }}
          isRetrying={isRefetching}
        />
      </section>
    )
  }

  if (!posts.length) {
    return (
      <section>
        <TimelineEmptyState />
      </section>
    )
  }

  return (
    <section  className='flex flex-col justify-center w-full items-center'>
        <TimelineList
          posts={posts}
          onOpenLikes={handleOpenLikes}
          onOpenComments={handleOpenComments}
          onShare={handleShare}
        />

        {hasNextPage ? <div ref={sentinelRef} className="h-10 w-full" /> : null}

        {isFetchingNextPage ? (
          <div className="flex justify-center py-6 text-sm text-neutral-400">
            Loading more posts...
          </div>
        ) : null}
    </section>
  )
}