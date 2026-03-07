import { PostActions } from "./post/PostActions"
import { PostCaption } from "./post/PostCaption"
import { PostHeader } from "./post/PostHeader"
import { PostMedia } from "./post/PostMedia"

type PostCardProps = {
  author: {
    name: string
    username: string
    avatarUrl: string | null
  }
  createdAt: string
  imageUrl: string
  caption: string
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

export const PostCard = ({
  author,
  createdAt,
  imageUrl,
  caption,
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
}: PostCardProps) => {
  return (
    <article className="flex w-full flex-col gap-3">
      <PostHeader author={author} createdAt={createdAt} />

      <PostMedia
        imageUrl={imageUrl}
        alt={caption || `Post by ${author.name}`}
      />

      <PostActions
        likedByMe={likedByMe}
        likeCount={likeCount}
        commentCount={commentCount}
        isSaved={isSaved}
        isLikePending={isLikePending}
        isSavePending={isSavePending}
        onLike={onLike}
        onOpenLikes={onOpenLikes}
        onOpenComments={onOpenComments}
        onShare={onShare}
        onSave={onSave}
      />

      <PostCaption
        username={author.username}
        caption={caption}
      />
    </article>
  )
}