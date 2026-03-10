import { Bookmark, Heart, MessageCircle, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type PostActionsProps = {
  likedByMe: boolean
  likeCount: number
  commentCount: number
  isSaved: boolean
  isLikePending?: boolean
  isSavePending?: boolean
  onLike: () => void
  onOpenLikes: () => void
  onOpenComments: () => void
  onShare: () => void
  onSave: () => void
}

export const PostActions = ({
  likedByMe,
  likeCount,
  commentCount,
  isSaved,
  isLikePending = false,
  isSavePending = false,
  onLike,
  onOpenLikes,
  onOpenComments,
  onShare,
  onSave,
}: PostActionsProps) => {
  return (
    <div className="flex items-center justify-between px-1">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            type="button"
            aria-label="Like post"
            disabled={isLikePending}
            onClick={onLike}
          >
            <Heart

              className={cn(
                'size-6',
                likedByMe && "fill-[#B41759] text-[#B41759]"
              )}
            />
          </Button>

          <Button
            variant="ghost"
            type="button"
            onClick={onOpenLikes}
            className="h-auto px-0 py-0 text-sm font-semibold leading-none text-white hover:bg-transparent hover:text-white hover:opacity-80 cursor-pointer"
          >
            {likeCount}
          </Button>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            type="button"
            aria-label="Open comments"
            onClick={onOpenComments}
          >
            <MessageCircle className="size-6"/>
          </Button>

          <Button
            variant="ghost"
            type="button"
            onClick={onOpenComments}
            className="h-auto px-0 py-0 text-sm font-semibold leading-none text-white hover:bg-transparent hover:text-white hover:opacity-80"
          >
            {commentCount}
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          type="button"
          aria-label="Share post"
          onClick={onShare}
        >
          <Send className="'ize-6" />
        </Button>
      </div>

      <Button
        variant="ghost"
        size="icon"
        type="button"
        aria-label="Save post"
        disabled={isSavePending}
        onClick={onSave}
      >
        <Bookmark
          className={cn('size-6',isSaved && "fill-white text-white")}
        />
      </Button>
    </div>
  )
}