import { User } from "@/features/user/types"
import { PostActions } from "./post/PostActions"
import { PostCaption } from "./post/PostCaption"
import { PostMedia } from "./post/PostMedia"
import { UserRow } from "@/features/user/ui"

type PostCardProps = {
  author: User
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
  onClickUser: (username: string) => void
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
  onClickUser
}: PostCardProps) => {
  return (
    <article className="flex w-full flex-col gap-3">
      <UserRow
        onClick={onClickUser}
        user={author}
        timePost={createdAt} />

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

      {caption && <PostCaption
        username={author.username}
        caption={caption}
      />}

    </article>
  )
}