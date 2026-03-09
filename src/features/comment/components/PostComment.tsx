"use client"

import { CommentTextbox } from "@/features/comment/components/CommentTextbox"
import { useGetPostComments } from "@/features/comment/hooks"
import { PostComment } from "@/features/comment/types"
import { CommentListError, CommentSkeleton } from "@/features/comment/ui"
import { CommentList } from "@/features/comment/ui/CommentList"
import { useTogglePostLike, useTogglePostSave } from "@/features/post/hooks"
import { PostDetail } from "@/features/post/types"
import { PostActions } from "@/features/post/ui/post"
import { cn } from "@/lib/utils"
import React, { useMemo } from "react"



type PostCommentsProps = {
    postDetail: PostDetail
    limit?: number
    className?: string
}

export const PostComments: React.FC<PostCommentsProps> = ({
    postDetail,
    limit = 10,
    className,
}) => {
    const commentsQuery = useGetPostComments(postDetail.id, limit)
      const toggleLike = useTogglePostLike()
      const toggleSave = useTogglePostSave()
    
      const handleLike = () => {
        toggleLike.mutate({
          postId: postDetail.id,
          likedByMe: postDetail.likedByMe,
        })
      }
    
      const handleSave = () => {
        toggleSave.mutate({
          postId: postDetail.id,
          isSaved: postDetail.isSaved,
        })
      }

    const comments = useMemo<PostComment[]>(() => {
        return commentsQuery.data?.pages.flatMap((page) => page.comments) ?? []
    }, [commentsQuery.data])

    if (commentsQuery.isPending) <CommentSkeleton />

    if (commentsQuery.isError) {
        <CommentListError
            onRetry={() => {
                void commentsQuery.refetch()
            }}
            isRetrying={commentsQuery.isRefetching}
        />
    }

    return (
        <div className={cn("flex lg:h-full h-125 min-h-0 flex-col", className)}>
            <div className="flex-1 overflow-y-auto">
                <div className="space-y-4">
                    <CommentList comments={comments} />

                    {commentsQuery.hasNextPage ? (
                        <button
                            type="button"
                            onClick={() => {
                                void commentsQuery.fetchNextPage()
                            }}
                            disabled={commentsQuery.isFetchingNextPage}
                            className="text-sm font-medium text-[#7751F9] transition-colors hover:text-[#8B6BFA] disabled:text-neutral-600"
                        >
                            {commentsQuery.isFetchingNextPage ? "Loading..." : "Load more comments"}
                        </button>
                    ) : null}
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <div className="hidden lg:flex flex-col w-full">

                      <PostActions
                        likedByMe={postDetail.likedByMe}
                        likeCount={postDetail.likeCount}
                        commentCount={postDetail.commentCount}
                        isSaved={postDetail.isSaved}
                        isLikePending={toggleLike.isPending}
                        isSavePending={toggleSave.isPending}
                        onLike={handleLike}
                        onOpenLikes={() => {}}
                        onOpenComments={() => {}}
                        onShare={() => {}}
                        onSave={handleSave}
                        
                      />
                </div>
                <CommentTextbox postId={postDetail.id} limit={limit} />
            </div>
        </div>
    )
}