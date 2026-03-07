"use client"

import { PostCard } from "@/features/post/ui"
import type { PostModel } from "@/features/post/types"
import {
  useTogglePostLike,
  useTogglePostSave,
} from "@/features/post/hooks"

type TimelinePostItemProps = {
  post: PostModel
  onOpenLikes: (postId: number) => void
  onOpenComments: (postId: number) => void
  onShare: (postId: number) => void
}

export const TimelinePostItem = ({
  post,
  onOpenLikes,
  onOpenComments,
  onShare,
}: TimelinePostItemProps) => {
  const toggleLike = useTogglePostLike()
  const toggleSave = useTogglePostSave()

  const handleLike = () => {
    toggleLike.mutate({
      postId: post.id,
      likedByMe: post.likedByMe,
    })
  }

  const handleSave = () => {
    toggleSave.mutate({
      postId: post.id,
      isSaved: post.isSaved,
    })
  }

  return (
    <PostCard
      author={post.author}
      createdAt={post.createdAt}
      imageUrl={post.imageUrl}
      caption={post.caption}
      likedByMe={post.likedByMe}
      likeCount={post.likeCount}
      commentCount={post.commentCount}
      isSaved={post.isSaved}
      isLikePending={toggleLike.isPending}
      isSavePending={toggleSave.isPending}
      onLike={handleLike}
      onOpenLikes={() => onOpenLikes(post.id)}
      onOpenComments={() => onOpenComments(post.id)}
      onShare={() => onShare(post.id)}
      onSave={handleSave}
    />
  )
}