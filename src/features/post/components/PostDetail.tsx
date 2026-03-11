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
import { useAppSelector } from "@/lib/hook"
import { selectIsAuthenticated } from "@/features/auth"
import { useMyProfile } from "@/features/user/hooks"
import { DeletePostButton } from "@/features/post/components/DeletePostButton"


type PostDetailDialogProps = {
  postId: number | null
  isSavePage: boolean;
}

export const PostDetail: React.FC<PostDetailDialogProps> = ({
  postId,
  isSavePage
}) => {
  
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const { data: myUsername } = useMyProfile((data) => data.profile.username);
  const { data: myUserId } = useMyProfile((data) => data.profile.id)
  const router = useRouter();
  const resolvedPostId = postId ?? 0

  const { data, isError, isPending } = usePostDetail(resolvedPostId)

  const postDetail = React.useMemo(() => {
    if (!data) return data

    if (isSavePage) {
      return {
        ...data,
        isSaved: true,
      }
    }

    return data
  }, [data, isSavePage])

  return (
    <div className="overflow-hidden rounded-3xl bg-[#0A0D12]">
      {isPending ? (<PostDetailSkeleton />) : isError ? (
        <PostDetailError />
      ) :
      
      (postId && postDetail) &&
      (
        <div className="flex h-[85vh] flex-col lg:h-180 lg:flex-row overflow-hidden rounded-3xl bg-[#0A0D12]">
          <div className="hidden min-w-0 overflow-hidden bg-black lg:w-180 lg:flex-1 lg:flex ">
            <div className="relative h-60 w-full sm:h-80 lg:h-full lg:min-h-160">
              <Image
                src={postDetail.imageUrl}
                alt={postDetail.caption ?? "Post image"}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 70vw"
                priority
              />
            </div>
          </div>

          <div className="flex min-h-0 w-full flex-col border-t border-[#181D27] bg-[#0A0D12] lg:w-120 lg:border-l lg:border-t-0">
            <div className="flex min-h-0 flex-1 flex-col gap-4 p-4">
              <div className="hidden shrink-0 flex-col gap-1 lg:flex">
                <div className="flex">
                  <UserRow
                    onClick={(username) => {
                      if (username === myUsername) {
                        router.push('/profile')
                        return
                      }

                      router.push(`/profile/${username}`)
                    }}
                    user={postDetail.author}
                    timePost={postDetail.createdAt}
                  />

                  {myUserId === postDetail.author.id ? (
                    <DeletePostButton postId={postId} />
                  ) : null}
                </div>

                {postDetail.caption ? (
                  <Caption caption={postDetail.caption} />
                ) : null}

                <Separator className="w-full" />
              </div>

              <PostComments
                postDetail={postDetail}
                isAuthenticated={isAuthenticated}
                className="min-h-0 flex-1"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}