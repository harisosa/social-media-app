"use client"

import { useMemo, useState } from "react"

import { Button } from "@/components/ui/button"

type PostCaptionProps = {
  username: string
  caption: string
}

const MAX_CAPTION_LENGTH = 110

export const PostCaption = ({
  username,
  caption,
}: PostCaptionProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const isLongCaption = caption.length > MAX_CAPTION_LENGTH

  const displayedCaption = useMemo(() => {
    if (isExpanded || !isLongCaption) {
      return caption
    }

    return `${caption.slice(0, MAX_CAPTION_LENGTH)}...`
  }, [caption, isExpanded, isLongCaption])

  return (
    <div className="px-1">
      <p className="text-sm leading-6 text-white">
        <span className="mr-2 font-semibold">{username}</span>
        <span className="text-white/90">{displayedCaption}</span>

        {isLongCaption && (
          <Button
            variant="ghost"
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="ml-2 inline h-auto px-0 py-0 text-sm font-medium text-neutral-400 hover:bg-transparent hover:text-white"
          >
            {isExpanded ? "less" : "more"}
          </Button>
        )}
      </p>
    </div>
  )
}