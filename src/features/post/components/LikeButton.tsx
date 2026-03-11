import { Button } from "@/components/ui/button";
import { selectIsAuthenticated } from "@/features/auth";
import { useTogglePostLike } from "@/features/post/hooks";
import { openOverlay } from "@/features/ui/store";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import React from "react";

type LikeButtonProps = {
    postId: number;
    liked: boolean;
    likeCount: number;
}

export const LikeButton: React.FC<LikeButtonProps> = ({ postId, liked, likeCount }) => {
    
    const isAuthenticated = useAppSelector(selectIsAuthenticated)
    const dispatch = useAppDispatch()
    const toggleLike = useTogglePostLike()

    const onLike = async () => {
        await toggleLike.mutate({
            postId,
            likedByMe: liked
        })
    }

    const onOpenLikes = () => {
        dispatch(
            openOverlay({
                type: 'likes',
                payload: { postId },
                size: 'md',
            })
        )
    }
    return (
        <div className="flex items-center gap-1.5">
            <Button
                variant="ghost"
                size="icon"
                type="button"
                aria-label="Like post"
                disabled={toggleLike.isPending || !isAuthenticated}
                onClick={onLike}
            >
                <Heart

                    className={cn(
                        'size-6',
                        liked && "fill-[#B41759] text-[#B41759]"
                    )}
                />
            </Button>

            <Button
                variant="ghost"
                type="button"
                onClick={onOpenLikes}
                className="h-auto px-0 py-0 text-sm font-semibold leading-none text-white hover:bg-transparent hover:text-white hover:opacity-80 cursor-pointer"
            >
                {likeCount}
            </Button>
        </div>
    )
}