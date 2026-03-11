import * as React from "react"

import { CommentItem } from "./CommentItem"
import { PostComment } from "@/features/comment/types"

type CommentListProps = {
  comments: PostComment[];
  postId: number;
  className?: string;
}

export const CommentList: React.FC<CommentListProps> = ({
  comments,
  className,
  postId,
}) => {
  if (comments.length === 0) {
    return (
      <div className={className}>
        <p className="text-sm text-neutral-500">No comments yet.</p>
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="flex flex-col gap-4">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            author={comment.author}
            text={comment.text}
            createdAt={comment.createdAt}
            commentId={comment.id}
            postId={postId}
          />
        ))}
      </div>
    </div>
  )
}