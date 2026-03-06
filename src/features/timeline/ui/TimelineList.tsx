import type { TimelinePost } from "../types"
import { TimelineCard } from "./TimelineCard"

type TimelineListProps = {
  posts: TimelinePost[]
}

export const TimelineList = ({ posts }: TimelineListProps) => {
  return (
    <div className="mx-auto flex w-full flex-col gap-6">
      {posts.map((post) => (
        <TimelineCard key={post.id} post={post} />
      ))}
    </div>
  )
}

