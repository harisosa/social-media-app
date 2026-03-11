'use client'

import React, { useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { InfiniteData } from '@tanstack/react-query'
import { UserRow, UserRowSkeleton } from '@/features/user/ui'
import { useInfiniteScroll } from '@/hooks'
import { FollowUsersResponse } from '@/features/follow/types'
import { useMyProfile } from '@/features/user/hooks'
import { useAppSelector } from '@/lib/hook'
import { selectIsAuthenticated } from '@/features/auth'
import { FollowButton } from '@/features/follow/components/FollowButton'


type FollowListContentProps = {
  title: string
  emptyLabel: string
  errorLabel: string
  data: InfiniteData<FollowUsersResponse> | undefined
  isPending: boolean
  isError: boolean
  hasNextPage: boolean | undefined
  isFetchingNextPage: boolean
  fetchNextPage: () => Promise<unknown>
}

export const FollowListContent: React.FC<FollowListContentProps> = ({
  title,
  emptyLabel,
  errorLabel,
  data,
  isPending,
  isError,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const { data: me} = useMyProfile();
  const router = useRouter()
  
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

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
        <h2 className="text-base font-semibold text-white">{title}</h2>
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
              {errorLabel}
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
                      user={user}
                      onClick={clickedUsername => {
                        router.push(`/profile/${clickedUsername}`)
                      }}
                    />

                    {!((me?.profile.id == user.id) || !isAuthenticated)? (
                      <FollowButton user={user} isFollow={user.isFollowedByMe} />
                    ) : null}
                  </div>
                )
              })
            : null}

          {!isPending && !isError && !users.length ? (
            <div className="py-6 text-center text-sm text-neutral-400">
              {emptyLabel}
            </div>
          ) : null}

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