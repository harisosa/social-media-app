"use client"

import { DialogPanel } from "@/components/ui/dialog-panel"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet"
import { LikesList } from "@/features/post/components/LikeList"
import { useMediaQuery } from "@/hooks/useMediaQuery"

type LikesDialogProps = {
  open: boolean
  postId: number
  onOpenChange: (open: boolean) => void
  title?: string
}

export const LikesDialog = ({
  open,
  postId,
  onOpenChange,
  title = "Likes",
}: LikesDialogProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <DialogPanel
        open={open}
        onOpenChange={onOpenChange}
        title={title}
        description="List of users who liked this post."
        size="md"
      >
        <LikesList open={open} postId={postId} title={title} />
      </DialogPanel>
    )
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[45dvh] rounded-t-[32px] border-[#181D27] bg-[#0A0D12] px-3 pb-4 pt-5 text-white"
      >
        <SheetTitle className="sr-only">{title}</SheetTitle>
        <SheetDescription className="sr-only">
          List of users who liked this post.
        </SheetDescription>

        <LikesList open={open} postId={postId} title={title} />
      </SheetContent>
    </Sheet>
  )
}