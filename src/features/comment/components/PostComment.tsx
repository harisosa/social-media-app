'use client'

import React, { useMemo } from 'react'
import { CommentTextbox } from '@/features/comment/components/CommentTextbox'
import { useGetPostComments } from '@/features/comment/hooks'
import { PostComment } from '@/features/comment/types'
import { CommentListError, CommentSkeleton } from '@/features/comment/ui'
import { CommentList } from '@/features/comment/ui/CommentList'
import { useTogglePostSave } from '@/features/post/hooks'
import { PostActions } from '@/features/post/ui/post'
import { cn } from '@/lib/utils'
import { useInfiniteScroll } from '@/hooks'
import { LIMIT_PAGE } from '@/constants'
import { PostModel } from '@/features/post/types'

type PostCommentsProps = {
  postDetail: PostModel
  limit?: number
  className?: string
  isAuthenticated: boolean

}

export const PostComments: React.FC<PostCommentsProps> = ({
  postDetail,
  limit = LIMIT_PAGE,
  className,
  isAuthenticated,

}) => {
  const commentsQuery = useGetPostComments(postDetail.id, limit)
  const toggleSave = useTogglePostSave()

  const comments = useMemo<PostComment[]>(() => {
    return commentsQuery.data?.pages.flatMap((page) => page.comments) ?? []
  }, [commentsQuery.data])

  const handleSave = async () => {
    await toggleSave.mutate({
      postId: postDetail.id,
      isSaved: postDetail.isSaved,
    })
  }

  const { sentinelRef } = useInfiniteScroll({
    enabled:
      !commentsQuery.isPending &&
      !commentsQuery.isFetchingNextPage &&
      Boolean(commentsQuery.hasNextPage),
    onLoadMore: () => {
      void commentsQuery.fetchNextPage()
    },
    rootMargin: '200px',
  })

  if (commentsQuery.isPending) {
    return <CommentSkeleton />
  }

  if (commentsQuery.isError) {
    return (
      <CommentListError
        onRetry={() => {
          void commentsQuery.refetch()
        }}
        isRetrying={commentsQuery.isRefetching}
      />
    )
  }

  return (
    <div
      className={cn(
        'grid h-full min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)_auto]',
        className
      )}
    >
      <h2 className="text-md font-bold">Comments</h2>

      <div className="h-[37vh] overflow-y-auto pt-4">
        <div className="space-y-4">
          <CommentList comments={comments} postId={postDetail.id}/>

          {commentsQuery.isFetchingNextPage ? <CommentSkeleton /> : null}

          {commentsQuery.hasNextPage ? (
            <div ref={sentinelRef} className="h-1 w-full" />
          ) : null}
        </div>
      </div>

      {isAuthenticated ? (
        <div className="pt-4">
          <div className="hidden w-full flex-col pb-4 lg:flex">
            <PostActions
            postId={postDetail.id}
              likedByMe={postDetail.likedByMe}
              likeCount={postDetail.likeCount}
              commentCount={postDetail.commentCount}
              isSaved={postDetail.isSaved}
              isSavePending={toggleSave.isPending}
              onOpenComments={() => {}}
              onShare={() => {}}
              onSave={handleSave}
            />
          </div>

          <CommentTextbox postId={postDetail.id} limit={limit} />
        </div>
      ) : null}
    </div>
  )
}