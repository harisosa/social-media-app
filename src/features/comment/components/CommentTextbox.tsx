"use client"

import * as React from "react"

import { Smile } from "lucide-react"
import { EmojiPicker } from "@ferrucc-io/emoji-picker"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { cn } from "@/lib/utils"
import { useCreateComment } from "@/features/comment/hooks"
import { LIMIT_PAGE } from "@/constants"

type CommentTextboxProps = {
  postId: number
  limit?: number
  className?: string
  disabled?: boolean;
}

export const CommentTextbox: React.FC<CommentTextboxProps> = ({
  postId,
  limit = LIMIT_PAGE,
  className,
  disabled,
}) => {
  const [text, setText] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  const createComment = useCreateComment(postId, limit)

  const trimmedText = text.trim()
  const isDisabled = createComment.isPending || disabled;
  const canSubmit = trimmedText.length > 0 && !isDisabled

  const handleSubmit = () => {
    if (!canSubmit) {
      return
    }

    createComment.mutate(trimmedText, {
      onSuccess: () => {
        setText("")
        inputRef.current?.focus()
      },
    })
  }

  const handlePickEmoji = (emoji: string) => {
    if (isDisabled) {
      return
    }

    setText((previous) => `${previous}${emoji}`)
    inputRef.current?.focus()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") {
      return
    }

    event.preventDefault()
    handleSubmit()
  }

  return (
    <div className="flex w-full items-center gap-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={isDisabled}
            className="h-12 w-12 shrink-0 rounded-xl border border-[#181D27] text-neutral-300 hover:bg-white/5 hover:text-white"
            aria-label="Open emoji picker"
          >
            <Smile className="size-5" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          side="top"
          sideOffset={12}
          className="w-auto border-white/10 bg-[#0B0F19] p-0 shadow-2xl"
        >
          <EmojiPicker
            onEmojiSelect={handlePickEmoji}
            className="w-[320px] rounded-xl border-0 bg-[#0B0F19]"
            emojisPerRow={8}
            emojiSize={28}
          >
            <EmojiPicker.Header className="p-2 pb-0">
              <EmojiPicker.Input
                placeholder="Search emoji"
                className="h-9 w-full rounded-md border border-white/10 bg-transparent px-3 text-sm text-white outline-none placeholder:text-neutral-500"
              />
            </EmojiPicker.Header>

            <EmojiPicker.Group>
              <EmojiPicker.List containerHeight={320} />
            </EmojiPicker.Group>
          </EmojiPicker>
        </PopoverContent>
      </Popover>

      <div className="relative min-w-0 flex-1">
        <Input
          ref={inputRef}
          value={text}
          disabled={isDisabled}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Really Good Photo 🥰"
          className={cn(
            "h-12 w-full border-[#181D27] bg-transparent pr-16 text-sm text-white shadow-none",
            "placeholder:text-neutral-500",
            "focus-visible:ring-0 focus-visible:ring-offset-0"
          )}
        />

        <Button
          type="button"
          variant="ghost"
          disabled={!canSubmit}
          onClick={handleSubmit}
          className="absolute right-2 top-1/2 h-8 -translate-y-1/2 rounded-full px-3 text-sm font-medium text-[#7751F9] hover:bg-transparent hover:text-[#8B6BFA] disabled:text-neutral-600"
        >
          Post
        </Button>
      </div>
    </div>
  )
}