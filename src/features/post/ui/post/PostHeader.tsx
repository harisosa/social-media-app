import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatTimeAgo, getInitials } from "@/lib/utils"

type PostHeaderProps = {
  author: {
    name: string
    username: string
    avatarUrl: string | null
  }
  createdAt: string
}

export const PostHeader = ({
  author,
  createdAt,
}: PostHeaderProps) => {
  const authorInitials = getInitials(author.name)
  const timeAgo = formatTimeAgo(createdAt)

  return (
    <header className="flex items-center">
      <div className="flex min-w-0 items-center gap-3">
        <Avatar className="h-11 w-11 shrink-0">
          <AvatarImage
            src={author.avatarUrl ?? undefined}
            alt={author.name}
            className="object-cover"
          />

          <AvatarFallback className="bg-neutral-800 text-xs font-semibold text-white">
            {authorInitials}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-bold leading-none text-white">
              {author.name}
            </p>

            <span className="truncate text-xs text-neutral-500">
              @{author.username}
            </span>
          </div>

          <p className="mt-1 text-xs font-normal leading-none text-neutral-400">
            {timeAgo}
          </p>
        </div>
      </div>
    </header>
  )
}