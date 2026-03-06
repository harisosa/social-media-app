"use client"

import { TimelineList } from "./TimelineList"
import { useTimelineInfinite } from "../hooks/useTimelineInfinite"
import { TimelineListSkeleton } from "@/features/timeline/ui/TimelineSkeleton"
import { Section } from "@/components/ui/section"
import { TimelineErrorState } from "@/features/timeline/ui/TimelineError"

export const TimelineComponent = () => {
  const {
    data,
    isPending,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isRefetching,
    refetch,
  } = useTimelineInfinite({
    limit: 20,
  })

  const posts = data?.pages.flatMap((page) => page.items) ?? []
  if (isPending) return <TimelineListSkeleton />

  if (isError) {
return <TimelineErrorState
          message={error instanceof Error ? error.message: "Something went wrong while loading posts."}
          onRetry={refetch}
          isRetrying={isRefetching}
        />

  } 
  if (!posts.length) {
    return (
      <Section className="w-full py-4">
        <div className="mx-auto flex w-full max-w-140 flex-col items-center justify-center gap-3 px-4 py-10 text-center sm:px-5 md:px-6">
          <h2 className="text-base font-semibold text-white">
            No posts yet
          </h2>
          <p className="text-sm text-neutral-400">
            Timeline is empty for now.
          </p>
        </div>
      </Section>
    )
  }

  return (
    <Section className="lg:px-105">
      <TimelineList posts={posts} />

      {hasNextPage && (
        <div className="mx-auto mt-6 flex w-full px-4 sm:px-5 md:px-6">
          <button
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="w-full rounded-full border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </Section>
  )
}