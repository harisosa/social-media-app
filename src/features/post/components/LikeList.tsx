'use client'

import React, { useMemo, useRef } from 'react'
import { useGetPostLikesInfinite } from '@/features/post/hooks'
import { UserRow, UserRowSkeleton } from '@/features/user/ui'
import { useInfiniteScroll } from '@/hooks'
import { useRouter } from 'next/navigation'
import { LIMIT_PAGE } from '@/constants'
import { useAppSelector } from '@/lib/hook'
import { selectIsAuthenticated } from '@/features/auth'
import { FollowButton } from '@/features/follow/components/FollowButton'
import { useMyProfile } from '@/features/user/hooks'

type LikesListProps = {
  postId: number
}

export const LikesList: React.FC<LikesListProps> = ({ postId }) => {
  const router = useRouter();
  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetPostLikesInfinite({
    postId,
    limit: LIMIT_PAGE,
  })

  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const { data: myUsername } = useMyProfile((data) => data.profile.username)
  const users = useMemo(() => {
    return data?.pages.flatMap(page => page.users) ?? []
  }, [data])

  const { sentinelRef } = useInfiniteScroll({
    enabled:
      !isPending &&
      !isFetchingNextPage &&
      !isError &&
      Boolean(hasNextPage),
    onLoadMore: () => {
      void fetchNextPage()
    },
    rootRef: scrollContainerRef,
    rootMargin: '120px',
  })

  return (
    <div className="p-5">
      <div className="px-2 pb-3">
        <h2 className="text-base font-semibold text-white">Likes</h2>
      </div>

      <div ref={scrollContainerRef} className="max-h-105 overflow-y-auto">
        <div className="flex flex-col gap-1">

          {isPending ? (
            <div className="flex flex-col gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <UserRowSkeleton key={index} />
              ))}
            </div>
          ) : null}

          {isError ? (
            <div className="py-6 text-center text-sm text-red-400">
              Failed to load likes
            </div>
          ) : null}

          {!isPending && !isError && users.length === 0 ? (
            <div className="py-10 text-center text-sm text-neutral-400">
              No likes yet
            </div>
          ) : null}

          {!isPending && !isError
            ? users.map(user => {
              return (
                <div
                  key={user.id}
                  className="flex items-center justify-between gap-3 rounded-2xl px-2 py-2"
                >
                  <UserRow
                    onClick={(username) => {
                      if (username === myUsername) {
                        router.push('/profile')
                        return
                      }
                      router.push(`/profile/${username}`)
                    }}
                    user={user}
                  />

                  {(user.isMe || isAuthenticated) ? (
                    <FollowButton user={user} isFollow={user.isFollowedByMe} />
                  ) : null}
                </div>
              )
            })
            : null}

          {!isPending && !isError && hasNextPage ? (
            <div ref={sentinelRef} className="h-1 w-full" />
          ) : null}

          {isFetchingNextPage ? (
            <div className="py-4 text-center text-sm text-neutral-400">
              Loading...
            </div>
          ) : null}

        </div>
      </div>
    </div>
  )
}