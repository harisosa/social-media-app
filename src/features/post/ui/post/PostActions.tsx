import { Bookmark, MessageCircle, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAppSelector } from "@/lib/hook"
import { selectIsAuthenticated } from "@/features/auth"
import { LikeButton } from "@/features/post/components/LikeButton"

type PostActionsProps = {
  postId: number;
  likedByMe: boolean
  likeCount: number
  commentCount: number
  isSaved: boolean
  isSavePending?: boolean
  onOpenComments: () => void
  onShare: () => void
  onSave: () => void
}

export const PostActions = ({
  postId,
  likedByMe,
  likeCount,
  commentCount,
  isSaved,
  isSavePending = false,
  onOpenComments,
  onShare,
  onSave,
}: PostActionsProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  return (
    <div className="flex items-center justify-between px-1">
      <div className="flex items-center gap-4">
        <LikeButton liked={likedByMe} likeCount={likeCount} postId={postId}/>

        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            type="button"
            aria-label="Open comments"
            onClick={onOpenComments}
          >
            <MessageCircle className="size-6" />
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

        {isAuthenticated && (
          <Button
            variant="ghost"
            size="icon"
            type="button"
            aria-label="Share post"
            onClick={onShare}
          >
            <Send className="'ize-6" />
          </Button>
        )}

      </div>

      {isAuthenticated && (<Button
        variant="ghost"
        size="icon"
        type="button"
        aria-label="Save post"
        disabled={isSavePending}
        onClick={onSave}
      >
        <Bookmark
          className={cn('size-6', isSaved && "fill-white text-white")}
        />
      </Button>)}

    </div>
  )
}