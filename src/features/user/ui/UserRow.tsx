"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "@/features/user/types"
import { getInitials, cn } from "@/lib/utils"


type UserRowProps = {
  user: User
  className?: string
  onClick?: (id: number) => void
}

export const UserRow = ({ user, className, onClick }: UserRowProps) => {
  const initials = getInitials(user.name)

  return (
    <div
      className={cn(
        "flex w-full items-center gap-3",
        className
      )}

    >
      <Avatar className="h-12 w-12 shrink-0"
            onClick={() => onClick && onClick(user.id)}
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
        <p className="truncate text-sm font-bold leading-none text-white"
              onClick={() => onClick && onClick(user.id)}
        >
          {user.name}
        </p>
        <p className="mt-1 truncate text-sm font-normal leading-none text-[#8C93A1]"
              onClick={() => onClick && onClick(user.id)}
        >
          {user.username}
        </p>
      </div>
    </div>
  )
}