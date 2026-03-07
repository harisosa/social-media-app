"use client"

import { X } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

import { getInitials } from "@/lib/utils"
import { useGetPostLikesInfinite } from "@/features/post/hooks"

type LikesDialogProps = {
  open: boolean
  postId: number
  onOpenChange: (open: boolean) => void
  title?: string
}

export const LikesDialog = ({
  open,
  postId,
  onOpenChange,
  title = "Likes",
}: LikesDialogProps) => {
  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetPostLikesInfinite({
    postId,
    limit: 20,
    enabled: open && !!postId,
  })

  const users = data?.pages.flatMap((page) => page.users) ?? []

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-[calc(100%-32px)] max-w-85 rounded-3xl border border-white/10 bg-[#050B16] p-0 text-white shadow-[0_20px_80px_rgba(0,0,0,0.5)]"
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">
          List of users who liked this post.
        </DialogDescription>

        {/* HEADER */}

        <div className="flex items-center justify-between px-5 pb-3 pt-5">
          <h2 className="text-base font-semibold text-white">{title}</h2>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition hover:bg-white/5 hover:text-white"
            aria-label="Close likes dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* CONTENT */}

        <div className="max-h-105 overflow-y-auto px-3 pb-4">
          <div className="flex flex-col gap-1">
            {isPending && (
              <div className="py-6 text-center text-sm text-neutral-400">
                Loading...
              </div>
            )}

            {isError && (
              <div className="py-6 text-center text-sm text-red-400">
                Failed to load likes
              </div>
            )}

            {!isPending &&
              users.map((user) => {
                const initials = getInitials(user.name)

                return (
                  <div
                    key={user.id}
                    className="flex items-center justify-between gap-3 rounded-2xl px-2 py-2"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <Avatar className="h-10 w-10 shrink-0">
                        <AvatarImage
                          src={user.avatarUrl ?? undefined}
                          alt={user.name}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-neutral-800 text-xs font-semibold text-white">
                          {initials}
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold leading-none text-white">
                          {user.name}
                        </p>
                        <p className="mt-1 truncate text-xs leading-none text-[#8C93A1]">
                          {user.username}
                        </p>
                      </div>
                    </div>

                    {user.isFollowedByMe ? (
                      <Button
                        type="button"
                        variant="outline"
                        className="h-9 rounded-full border-white/15 bg-transparent px-4 text-xs font-medium text-white hover:bg-white/5 hover:text-white"
                      >
                        Following
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        className="h-9 rounded-full bg-[#7751F9] px-5 text-xs font-semibold text-white hover:bg-[#6A45E8]"
                      >
                        Follow
                      </Button>
                    )}
                  </div>
                )
              })}
          </div>
          {hasNextPage && (
            <div className="flex justify-center pt-4">
              <Button
                variant="ghost"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="text-sm text-neutral-300 hover:text-white"
              >
                {isFetchingNextPage ? "Loading..." : "Load more"}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}