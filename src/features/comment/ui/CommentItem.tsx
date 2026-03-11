import * as React from "react"

import { UserRow } from "@/features/user/ui"
import { User } from "@/features/user/types"
import { Caption } from "@/components/ui/caption"
import { useRouter } from "next/navigation"
import { useMyProfile } from "@/features/user/hooks"
import { CommentDeleteButton } from "@/features/comment/components"

type CommentItemProps = {
    author: User;
    postId: number;
    commentId: number;
    text: string;
    createdAt: string;
    className?: string;
}

export const CommentItem: React.FC<CommentItemProps> = ({
    author,
    text,
    createdAt,
    className,
    postId,
    commentId
}) => {
    const router = useRouter();
    const { data: myUsername } = useMyProfile((data) => data.profile.username)
    return (
        <div className={className}>
            <div className="flex items-start gap-3 flex-col">
                <div className="flex w-full justify-between">
                <UserRow
                    onClick={(username) => {
                        if (username === myUsername) {
                            router.push('/profile')
                            return
                        }
                        router.push(`/profile/${username}`)
                    }}
                    user={author} timePost={createdAt} />

                    {author.username === myUsername && <CommentDeleteButton postId={postId} commentId={commentId}/>}
                </div>

                <div className="min-w-0 flex-1">
                    {
                        text && <Caption caption={text} />
                    }
                </div>
            </div>
        </div>
    )
}