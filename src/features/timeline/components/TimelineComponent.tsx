"use client"

import { useEffect, useRef } from "react"

import { useTimelineInfinite } from "../hooks/useTimelineInfinite"
import { TimelineEmptyState } from "../ui/TimelineEmptyState"
import { TimelineList } from "../ui/TimelineList"
import { TimelineErrorState, TimelineListSkeleton } from "@/features/timeline/ui"
import { openOverlay } from "@/features/ui/store"
import { Container } from "@/components/ui/container"
import { useAppDispatch } from "@/lib/hook"


export const TimelineComponent = () => {
  const dispatch = useAppDispatch()
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

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
  } = useTimelineInfinite({
    limit: 20,
  })

  const posts = data?.pages.flatMap((page) => page.items) ?? []

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) {
      return
    }

    const element = loadMoreRef.current

    if (!element) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]

        if (entry?.isIntersecting) {
          void fetchNextPage()
        }
      },
      {
        rootMargin: "200px",
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  const handleOpenLikes = (postId: number) => {
    dispatch(
      openOverlay({
        type: "likes",
        payload: { postId },
        size:'md'
      })
    )
  }

  const handleOpenComments = (postId: number) => {
    dispatch(
      openOverlay({
        type: "post-detail",
        payload: { postId },
        size:'lg'
      })
    )
  }

  const handleShare = (postId: number) => {
    console.log("share post", postId)
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
              : "Something went wrong while loading posts."
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
    <section>
      <Container size="timeline">
        <TimelineList
          posts={posts}
          onOpenLikes={handleOpenLikes}
          onOpenComments={handleOpenComments}
          onShare={handleShare}
        />

        {hasNextPage && <div ref={loadMoreRef} className="h-10 w-full" />}

        {isFetchingNextPage && (
          <div className="flex justify-center py-6 text-sm text-neutral-400">
            Loading more posts...
          </div>
        )}
      </Container>
    </section>
  )
}