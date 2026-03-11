import { User } from "@/features/user/types"
import { PostActions } from "./post/PostActions"
import { PostCaption } from "./post/PostCaption"
import { PostMedia } from "./post/PostMedia"
import { UserRow } from "@/features/user/ui"

type PostCardProps = {
  postId: number
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
  onOpenComments: () => void
  onShare: () => void
  onSave: () => void
  onClickUser: (username: string) => void
}

export const PostCard = ({
  postId,
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
        postId={postId}
        likedByMe={likedByMe}
        likeCount={likeCount}
        commentCount={commentCount}
        isSaved={isSaved}
        isLikePending={isLikePending}
        isSavePending={isSavePending}
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