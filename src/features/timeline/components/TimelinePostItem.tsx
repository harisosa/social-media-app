"use client"

import { PostCard } from "@/features/post/ui"
import type { PostModel } from "@/features/post/types"
import {
  useTogglePostSave,
} from "@/features/post/hooks"
import { useRouter } from "next/navigation"

type TimelinePostItemProps = {
  post: PostModel
  onOpenComments: (postId: number) => void
  onShare: (postId: number) => void
}

export const TimelinePostItem = ({
  post,
  onOpenComments,
  onShare,
}: TimelinePostItemProps) => {
  const router = useRouter();

  const toggleSave = useTogglePostSave()



  const handleSave = () => {
    toggleSave.mutate({
      postId: post.id,
      isSaved: post.isSaved,
    })
  }

  return (
    <PostCard
      postId={post.id}
      author={post.author}
      createdAt={post.createdAt}
      imageUrl={post.imageUrl}
      caption={post.caption}
      likedByMe={post.likedByMe}
      likeCount={post.likeCount}
      commentCount={post.commentCount}
      isSaved={post.isSaved}
      isSavePending={toggleSave.isPending}

      onOpenComments={() => onOpenComments(post.id)}
      onShare={() => onShare(post.id)}
      onSave={handleSave}
      onClickUser={(username) => { router.push(`/profile/${username}`) }}
    />
  )
}