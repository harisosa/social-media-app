"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


import type { TimelinePost } from "../types"
import { formatTimeAgo, getInitials } from "@/lib/utils"

type TimelineCardProps = {
  post: TimelinePost
}

const MAX_CAPTION_LENGTH = 110

export const TimelineCard = ({ post }: TimelineCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const isLongCaption = post.caption.length > MAX_CAPTION_LENGTH

  const displayedCaption = useMemo(() => {
    if (isExpanded || !isLongCaption) {
      return post.caption
    }

    return `${post.caption.slice(0, MAX_CAPTION_LENGTH)}...`
  }, [isExpanded, isLongCaption, post.caption])

  const authorInitials = getInitials(post.author.name)
  const timeAgo = formatTimeAgo(post.createdAt)

  return (
    <article className="flex w-full flex-col gap-3">
      <header className="flex items-center justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarImage
              src={post.author.avatarUrl ?? undefined}
              alt={post.author.name}
              className="object-cover"
            />
            <AvatarFallback className="bg-neutral-800 text-xs font-semibold text-white">
              {authorInitials}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="truncate text-sm font-semibold leading-none text-white">
                {post.author.name}
              </p>
              <span className="truncate text-xs text-neutral-500">
                @{post.author.username}
              </span>
            </div>

            <p className="mt-1 text-xs leading-none text-neutral-400">
              {timeAgo}
            </p>
          </div>
        </div>

        <button
          type="button"
          aria-label="More options"
          className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition hover:bg-neutral-900 hover:text-white"
        >
          <MoreHorizontal size={18} />
        </button>
      </header>

      <div className="relative w-full overflow-hidden rounded-[24px] bg-neutral-900">
        <div className="relative aspect-4/5 w-full sm:aspect-5/6">
          <Image
            src={post.imageUrl}
            alt={post.caption || `Post by ${post.author.name}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 560px"
          />
        </div>
      </div>

      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Like post"
            className="flex items-center gap-2 text-white transition hover:opacity-80"
          >
            <Heart
              size={22}
              className={post.likedByMe ? "fill-[#7751F9] text-[#7751F9]" : ""}
            />
            <span className="text-sm font-medium leading-none">
              {post.likeCount}
            </span>
          </button>

          <button
            type="button"
            aria-label="Open comments"
            className="flex items-center gap-2 text-white transition hover:opacity-80"
          >
            <MessageCircle size={22} />
            <span className="text-sm font-medium leading-none">
              {post.commentCount}
            </span>
          </button>

          <button
            type="button"
            aria-label="Share post"
            className="text-white transition hover:opacity-80"
          >
            <Send size={21} />
          </button>
        </div>

        <button
          type="button"
          aria-label="Save post"
          className="text-white transition hover:opacity-80"
        >
          <Bookmark size={21} />
        </button>
      </div>

      <div className="px-1">
        <p className="text-sm leading-6 text-white">
          <span className="mr-2 font-semibold">{post.author.username}</span>
          <span className="text-white/90">{displayedCaption}</span>

          {isLongCaption && (
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              className="ml-2 inline text-sm font-medium text-neutral-400 transition hover:text-white"
            >
              {isExpanded ? "less" : "more"}
            </button>
          )}
        </p>
      </div>
    </article>
  )
}