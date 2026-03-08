"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DialogPanel } from "@/components/ui/dialog-panel"

import { useFollowUser } from "@/features/follow/hooks/useFollowUser"
import { useGetPostLikesInfinite } from "@/features/post/hooks"
import { getInitials } from "@/lib/utils"

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

  const followMutation = useFollowUser()

  const users = data?.pages.flatMap((page) => page.users) ?? []

  return (
    <DialogPanel
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description="List of users who liked this post."
      size="md"
    >
      <div className="px-2 pb-3">
        <h2 className="text-base font-semibold text-white">{title}</h2>
      </div>

      <div className="max-h-105 overflow-y-auto">
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
            !isError &&
            users.map((user) => {
              const initials = getInitials(user.name)
              const isPendingForThisUser =
                followMutation.isPending &&
                followMutation.variables?.username === user.username

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
                        @{user.username}
                      </p>
                    </div>
                  </div>

                  {!user.isMe ? (
                    user.isFollowedByMe ? (
                      <Button
                        type="button"
                        variant="outline"
                        disabled={isPendingForThisUser}
                        onClick={() =>
                          followMutation.mutate({
                            username: user.username,
                            userId:user.id,
                            following: true,
                          })
                        }
                        className="h-9 rounded-full border-white/15 bg-transparent px-4 text-xs font-medium text-white hover:bg-white/5 hover:text-white"
                      >
                        Following
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        disabled={isPendingForThisUser}
                        onClick={() =>
                          followMutation.mutate({
                            username: user.username,
                            userId:user.id,
                            following: false,
                          })
                        }
                        className="h-9 rounded-full bg-[#7751F9] px-5 text-xs font-semibold text-white hover:bg-[#6A45E8]"
                      >
                        Follow
                      </Button>
                    )
                  ) : null}
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
    </DialogPanel>
  )
}