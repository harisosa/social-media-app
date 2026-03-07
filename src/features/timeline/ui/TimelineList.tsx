import type { PostModel } from "@/features/post/types"

import { TimelinePostItem } from "../components/TimelinePostItem"

type TimelineListProps = {
  posts: PostModel[]
  onOpenLikes: (postId: number) => void
  onOpenComments: (postId: number) => void
  onShare: (postId: number) => void
}

export const TimelineList = ({
  posts,
  onOpenLikes,
  onOpenComments,
  onShare,
}: TimelineListProps) => {
  return (
    <div className="mx-auto flex w-full max-w-140 flex-col gap-6 px-4 sm:px-5 md:gap-8 md:px-6">
      {posts.map((post) => (
        <TimelinePostItem
          key={post.id}
          post={post}
          onOpenLikes={onOpenLikes}
          onOpenComments={onOpenComments}
          onShare={onShare}
        />
      ))}
    </div>
  )
}