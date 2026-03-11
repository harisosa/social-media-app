'use client'

import { Button } from "@/components/ui/button";
import { useFollowUser } from "@/features/follow/hooks";
import { User } from "@/features/user/types";
import { CheckCircle2 } from "lucide-react";
import React from "react";

type FollowButtonProps = {
    user: User;
    isFollow: boolean;
}


export const FollowButton: React.FC<FollowButtonProps> = ({ user, isFollow }) => {
    const followMutation = useFollowUser();
    return (
        isFollow ? (
            <Button
                type="button"
                variant="outline"
                disabled={followMutation.isPending}
                onClick={() =>
                    followMutation.mutate({
                        username: user.username,
                        userId: user.id,
                        following: true,
                    })
                }
                className="h-10 w-31.75 rounded-full border-white/15 bg-transparent px-4 text-sm font-bold text-white hover:bg-white/5 hover:text-white"
            >
                <CheckCircle2 className="mr-2 size-5" />
                Following
            </Button>
        ) : (
            <Button
                type="button"
                disabled={followMutation.isPending}
                onClick={() =>
                    followMutation.mutate({
                        username: user.username,
                        userId: user.id,
                        following: false,
                    })
                }
                className="h-10 w-31.75 rounded-full bg-[#7751F9] px-5 text-sm font-bold text-white hover:bg-[#6A45E8]"
            >
                Follow
            </Button>
        )
    )
}