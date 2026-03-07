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
            className="h-9 w-9 rounded-full p-0 text-white hover:bg-transparent hover:opacity-80 disabled:opacity-60"
          >
            <Heart
              size={22}
              className={cn(
                likedByMe && "fill-[#B41759] text-[#B41759]"
              )}
            />
          </Button>

          <Button
            variant="ghost"
            type="button"
            onClick={onOpenLikes}
            className="h-auto px-0 py-0 text-sm font-medium leading-none text-white hover:bg-transparent hover:text-white hover:opacity-80"
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
            className="h-9 w-9 rounded-full p-0 text-white hover:bg-transparent hover:opacity-80"
          >
            <MessageCircle size={22} />
          </Button>

          <Button
            variant="ghost"
            type="button"
            onClick={onOpenComments}
            className="h-auto px-0 py-0 text-sm font-medium leading-none text-white hover:bg-transparent hover:text-white hover:opacity-80"
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
          className="h-9 w-9 rounded-full p-0 text-white hover:bg-transparent hover:opacity-80"
        >
          <Send size={21} />
        </Button>
      </div>

      <Button
        variant="ghost"
        size="icon"
        type="button"
        aria-label="Save post"
        disabled={isSavePending}
        onClick={onSave}
        className="h-9 w-9 rounded-full p-0 text-white hover:bg-transparent hover:opacity-80 disabled:opacity-60"
      >
        <Bookmark
          size={21}
          className={cn(isSaved && "fill-white text-white")}
        />
      </Button>
    </div>
  )
}