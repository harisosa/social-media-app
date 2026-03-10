"use client"

import * as React from "react"

import { RotateCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type PostCommentsErrorProps = {
  onRetry: () => void
  isRetrying?: boolean
  className?: string
}

export const CommentListError: React.FC<PostCommentsErrorProps> = ({
  onRetry,
  isRetrying = false,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3",
        className
      )}
    >
      <p className="text-sm text-neutral-400">Failed to load comments.</p>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onRetry}
        disabled={isRetrying}
        className="h-8 w-8 shrink-0 rounded-full text-neutral-300 hover:bg-white/5 hover:text-white disabled:text-neutral-600 cursor-pointer"
        aria-label="Retry loading comments"
      >
        <RotateCw className={cn("size-4", isRetrying && "animate-spin")} />
      </Button>
    </div>
  )
}