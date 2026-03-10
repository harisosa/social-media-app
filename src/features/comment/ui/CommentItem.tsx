import * as React from "react"

import { UserRow } from "@/features/user/ui"
import { User } from "@/features/user/types"
import { Caption } from "@/components/ui/caption"
import { useRouter } from "next/navigation"

type CommentItemProps = {
    author: User,
    text: string
    createdAt: string
    className?: string
}

export const CommentItem: React.FC<CommentItemProps> = ({
    author,
    text,
    createdAt,
    className,
}) => {
    const router = useRouter();
    return (
        <div className={className}>
            <div className="flex items-start gap-3 flex-col">
                <UserRow
                onClick={(username) => {
                      router.push(`/profile/${username}`)
                    }} 
                user={author} timePost={createdAt}/>
                <div className="min-w-0 flex-1">
                    <Caption caption={text}/>
                </div>
            </div>
        </div>
    )
}