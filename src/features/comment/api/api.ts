import { CreateCommentPayload, DeleteCommentResponse, GetPostCommentsParams, PostComment, PostCommentsResponse } from "@/features/comment/types";
import { api } from "@/lib/http";

  export const getPostComments = ({ postId, page, limit }: GetPostCommentsParams) =>
  api<PostCommentsResponse>({
    method: "GET",
    url: `/posts/${postId}/comments`,
    params: {
      page,
      limit,
    },
  })


export const createComment = ({ postId, text }: CreateCommentPayload) =>
  api<PostComment>({
    method: "POST",
    url: `/posts/${postId}/comments`,
    data: {
      text,
    },
  })

  export const deleteComment = async (commentId: number) => {
  return api<DeleteCommentResponse>({
    method: "DELETE",
    url: `/comments/${commentId}`,
  })
}