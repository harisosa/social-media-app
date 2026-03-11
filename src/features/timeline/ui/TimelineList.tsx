import type { PostModel } from "@/features/post/types"

import { TimelinePostItem } from "../components/TimelinePostItem"
import { Separator } from "@/components/ui/separator"


type TimelineListProps = {
  posts: PostModel[]
  onOpenComments: (postId: number) => void
  onShare: (postId: number) => void
}

export const TimelineList = ({
  posts,
  onOpenComments,
  onShare,
}: TimelineListProps) => {
  return (
    <div className="flex lg:w-150 w-full flex-col gap-4">
      {posts.map((post) => (
        <div key={post.id}>
                <TimelinePostItem
          
          post={post}
          onOpenComments={onOpenComments}
          onShare={onShare}
        />
        <Separator className="w-full mt-4" />
        </div>

      ))}
    </div>
  )
}