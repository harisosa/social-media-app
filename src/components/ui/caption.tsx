"use client"

import { Button } from "@/components/ui/button"
import React, { useMemo, useState } from "react"


const MAX_CAPTION_LENGTH = 110

export const Caption: React.FC<{ caption: string, className?: string }> = ({ caption, className }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const isLongCaption = caption.length > MAX_CAPTION_LENGTH

  const displayedCaption = useMemo(() => {
    if (isExpanded || !isLongCaption) {
      return caption
    }

    return `${caption.slice(0, MAX_CAPTION_LENGTH)}...`
  }, [caption, isExpanded, isLongCaption])


  return (
    <>
      <span className={className}>{displayedCaption}</span>

      {isLongCaption && (
        <Button
          variant="ghost"
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="ml-2 inline h-auto px-0 py-0 text-sm font-medium text-neutral-400 hover:bg-transparent hover:text-white text-left cursor-pointer"
        >
          {isExpanded ? "less" : "more"}
        </Button>
      )}</>
  )
}