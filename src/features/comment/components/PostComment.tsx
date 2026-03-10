'use client'

import React, { useMemo, useRef } from 'react'
import { CommentTextbox } from '@/features/comment/components/CommentTextbox'
import { useGetPostComments } from '@/features/comment/hooks'
import { PostComment } from '@/features/comment/types'
import { CommentListError, CommentSkeleton } from '@/features/comment/ui'
import { CommentList } from '@/features/comment/ui/CommentList'
import { useTogglePostLike, useTogglePostSave } from '@/features/post/hooks'
import { PostDetail } from '@/features/post/types'
import { PostActions } from '@/features/post/ui/post'
import { cn } from '@/lib/utils'
import { useInfiniteScroll } from '@/hooks'
import { LIMIT_PAGE } from '@/constants'

type PostCommentsProps = {
  postDetail: PostDetail
  limit?: number
  className?: string
}

export const PostComments: React.FC<PostCommentsProps> = ({
  postDetail,
  limit = LIMIT_PAGE,
  className,
}) => {
  const commentsQuery = useGetPostComments(postDetail.id, limit)
  const toggleLike = useTogglePostLike()
  const toggleSave = useTogglePostSave()

  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

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
    return commentsQuery.data?.pages.flatMap(page => page.comments) ?? []
  }, [commentsQuery.data])

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
    <div className={cn('flex min-h-80 flex-col lg:h-full gap-4', className)}>
      <h2 className='text-md font-[700]'>Comments</h2>
      <div ref={scrollContainerRef} className="flex-1 ">
        <div className="space-y-4 overflow-auto  h-115 ">
          <CommentList comments={comments} />

          {commentsQuery.isFetchingNextPage ? <CommentSkeleton /> : null}

          {commentsQuery.hasNextPage ? (
            <div ref={sentinelRef} className="h-1 w-full" />
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="hidden w-full flex-col lg:flex">
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