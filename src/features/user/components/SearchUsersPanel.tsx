"use client"

import { SearchUsersEmpty, UserRowSkeleton } from "@/features/user/ui"
import { useUserSearch } from "../hooks/useUserSearch"
import { UserRow } from "../ui/UserRow"
import { cn } from "@/lib/utils"

type Props = {
  query: string
  open: boolean
  mobile?: boolean
  className?: string
}

export const SearchUsersPanel = ({
  query,
  open,
  mobile = false,
  className,
}: Props) => {
  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useUserSearch({ q: query })

  const users = data?.pages.flatMap((page) => page.users) ?? []

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const element = event.currentTarget
    const isNearBottom =
      element.scrollHeight - element.scrollTop <= element.clientHeight + 100

    if (isNearBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  if (!open) return null

  return (
    <div
      className={cn(
        mobile
          ? "fixed inset-x-0 top-16 z-40 border-t border-[#181D27] bg-black"
          : "absolute left-0 right-0 z-50 rounded-[24px] border border-[#172033] bg-[#040B16] shadow-[0_10px_40px_rgba(0,0,0,0.45)]",
        className,
      )}
    >
      <div
        onScroll={handleScroll}
        className={cn(
          "overflow-y-auto",
          mobile
            ? "h-[calc(100dvh-64px)] px-4 pb-4 pt-2"
            : "max-h-105 p-3",
        )}
      >
        {isPending ? (
          <div className="flex flex-col gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <UserRowSkeleton key={index} />
            ))}
          </div>
        ) : null}

        {isError ? (
          <div className="py-10 text-center text-sm text-red-400">
            Failed to load users
          </div>
        ) : null}

        {!isPending && !isError && users.length > 0 ? (
          <div className="flex flex-col gap-1">
            {users.map((user) => (
              <div
                key={user.id}
                className="rounded-xl px-2 py-2 hover:bg-white/5"
              >
                <UserRow user={user} />
              </div>
            ))}

            {isFetchingNextPage ? (
              <div className="flex flex-col gap-2 pt-2">
                {Array.from({ length: 2 }).map((_, index) => (
                  <UserRowSkeleton key={`next-${index}`} />
                ))}
              </div>
            ) : null}
          </div>
        ) : null}

        {!isPending && !isError && users.length === 0 && query.trim() ? (
          <SearchUsersEmpty />
        ) : null}
      </div>
    </div>
  )
}