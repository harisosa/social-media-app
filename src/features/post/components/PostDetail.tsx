"use client"

import * as React from "react"
import Image from "next/image"

import { usePostDetail } from "@/features/post/hooks/usePostDetail"
import { PostComments } from "@/features/comment/components"
import { PostDetailSkeleton } from "@/features/post/ui/PostDetailSkeleton"
import { PostDetailError } from "@/features/post/ui"
import { UserRow } from "@/features/user/ui"
import { useRouter } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { Caption } from "@/components/ui/caption"


type PostDetailDialogProps = {
  postId: number | null
}

export const PostDetail: React.FC<PostDetailDialogProps> = ({
  postId
}) => {
  const router = useRouter();
  const resolvedPostId = postId ?? 0

  const postQuery = usePostDetail(resolvedPostId)

  if (!postId) {
    return null
  }

  return (
    <div className="overflow-hidden rounded-3xl bg-[#0A0D12]">
      {postQuery.isPending ? (<PostDetailSkeleton />) : postQuery.isError ? (
        <PostDetailError />
      ) : (
        <div className="flex min-h-[85vh] flex-col lg:min-h-160 lg:flex-row">
          <div className="hidden min-w-0 overflow-hidden bg-black lg:w-180 lg:flex-1 lg:flex ">
            <div className="relative h-60 w-full sm:h-80 lg:h-full lg:min-h-160">
              <Image
                src={postQuery.data.imageUrl}
                alt={postQuery.data.caption ?? "Post image"}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 70vw"
                priority
              />
            </div>
          </div>

          <div className="flex min-h-0 w-full flex-col border-t border-[#181D27] bg-[#0A0D12] lg:w-120 lg:border-l lg:border-t-0">
            <div className="flex flex-col flex-1 overflow-y-auto p-4 gap-4">
              <div className="hidden lg:flex flex-col gap-1">
                <UserRow
                  onClick={(username) => {
                    router.push(`/profile/${username}`)
                  }}
                  user={postQuery.data.author} timePost={postQuery.data.createdAt} />
                <Caption caption={postQuery.data.caption} />
                <Separator className="w-full" />
              </div>

              <PostComments postDetail={postQuery.data} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}