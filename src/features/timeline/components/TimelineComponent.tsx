"use client"

import { useEffect, useRef, useState } from "react"

import { useTimelineInfinite } from "../hooks/useTimelineInfinite"
import { TimelineEmptyState } from "../ui/TimelineEmptyState"
import { TimelineList } from "../ui/TimelineList"
import { TimelineErrorState, TimelineListSkeleton } from "@/features/timeline/ui"
import { LikesDialog } from "@/features/post/components"


export const TimelineComponent = () => {
  const [likesPostId, setLikesPostId] = useState<number | null>(null)
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
    setLikesPostId(postId)
  }

  const handleOpenComments = (postId: number) => {
    console.log("open comments", postId)
  }

  const handleShare = (postId: number) => {
    console.log("share post", postId)
  }

  if (isPending) {
    return (
      <section className="w-full py-4">
        <TimelineListSkeleton />
      </section>
    )
  }

  if (isError) {
    return (
      <section className="w-full py-4">
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
      <section className="w-full py-4">
        <TimelineEmptyState />
      </section>
    )
  }

  return (
    <>
      <section className="w-full py-4">
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
      </section>

      {
        likesPostId && (
          <LikesDialog
            open={likesPostId !== null}
            postId={likesPostId}
            onOpenChange={(open) => {
              if (!open) {
                setLikesPostId(null)
              }
            }}
          />
        )
      }

    </>
  )
}