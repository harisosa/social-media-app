"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "@/features/user/types"
import { getInitials, cn, formatTimeAgo } from "@/lib/utils"


type UserRowProps = {
  user: User
  className?: string;
  onClick?: (username: string) => void;
  timePost?: string;
}

export const UserRow = ({ user, className, onClick, timePost }: UserRowProps) => {
  const initials = getInitials(user.name)

  return (
    <div
      className={cn(
        "flex w-full items-center gap-3",
        className
      )}

    >
      <Avatar className="h-12 w-12 shrink-0 cursor-pointer"
        onClick={() => onClick && onClick(user.username)}
      >
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
        <p className="truncate text-sm font-bold leading-none text-white cursor-pointer"
          onClick={() => onClick && onClick(user.username)}
        >
          {user.name}
        </p>
        {timePost ?

          (
            <p className="mt-2 text-xs text-neutral-500">
              {formatTimeAgo(timePost)}
            </p>

          )
          :
          (<p className="mt-1 truncate text-sm font-normal leading-none text-[#8C93A1]">
            {user.username}
          </p>
          )
        }

      </div>
    </div>
  )
}