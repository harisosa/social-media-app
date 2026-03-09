'use client'

import React, { useMemo, useRef } from 'react'
import { CheckCircle2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useFollowUser } from '@/features/follow/hooks'
import { useGetPostLikesInfinite } from '@/features/post/hooks'
import { UserRow } from '@/features/user/ui'
import { useInfiniteScroll } from '@/hooks'

type LikesListProps = {
  postId: number
}

export const LikesList: React.FC<LikesListProps> = ({ postId }) => {
  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetPostLikesInfinite({
    postId,
    limit: 10,
  })

  const followMutation = useFollowUser()
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
        <h2 className="text-base font-semibold text-white">Likes</h2>
      </div>

      <div ref={scrollContainerRef} className="max-h-105 overflow-y-auto">
        <div className="flex flex-col gap-1">
          {isPending ? (
            <div className="py-6 text-center text-sm text-neutral-400">
              Loading...
            </div>
          ) : null}

          {isError ? (
            <div className="py-6 text-center text-sm text-red-400">
              Failed to load likes
            </div>
          ) : null}

          {!isPending && !isError
            ? users.map(user => {
                const isPendingForThisUser =
                  followMutation.isPending &&
                  followMutation.variables?.userId === user.id

                return (
                  <div
                    key={user.id}
                    className="flex items-center justify-between gap-3 rounded-2xl px-2 py-2"
                  >
                    <UserRow user={user} />

                    {!user.isMe ? (
                      user.isFollowedByMe ? (
                        <Button
                          type="button"
                          variant="outline"
                          disabled={isPendingForThisUser}
                          onClick={() =>
                            followMutation.mutate({
                              username: user.username,
                              userId: user.id,
                              following: true,
                            })
                          }
                          className="h-10 w-31.75 rounded-full border-white/15 bg-transparent px-4 text-sm font-bold text-white hover:bg-white/5 hover:text-white"
                        >
                          <CheckCircle2 className="mr-2 size-5" />
                          Following
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          disabled={isPendingForThisUser}
                          onClick={() =>
                            followMutation.mutate({
                              username: user.username,
                              userId: user.id,
                              following: false,
                            })
                          }
                          className="h-10 w-31.75 rounded-full bg-[#7751F9] px-5 text-sm font-bold text-white hover:bg-[#6A45E8]"
                        >
                          Follow
                        </Button>
                      )
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