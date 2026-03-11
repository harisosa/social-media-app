"use client"

import { Trash2 } from "lucide-react"
import { useDeleteComment } from "@/features/comment/hooks/useDeleteComment"

type CommentDeleteButtonProps = {
  commentId: number
  postId: number
}

export const CommentDeleteButton = ({
  commentId,
  postId,
}: CommentDeleteButtonProps) => {
  const deleteCommentMutation = useDeleteComment(postId)

  const handleDelete = () => {
    deleteCommentMutation.mutate({ commentId })
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleteCommentMutation.isPending}
      className="text-neutral-500 hover:text-red-500 transition-colors"
      aria-label="Delete comment"
    >
      <Trash2 size={16} />
    </button>
  )
}