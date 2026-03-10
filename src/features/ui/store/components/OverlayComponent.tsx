"use client"

import React, { useEffect } from "react"

import {
  closeOverlay,
  selectOverlayIsOpen,
  selectOverlayPayload,
  selectOverlayType,
} from "@/features/ui/store"
import { DialogPanel } from "@/components/ui/dialog-panel"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { useAppDispatch, useAppSelector } from "@/lib/hook"
import { LikesList, PostDetail } from "@/features/post/components"
import { selectOverlayIsSize } from "@/features/ui/store/ui.selectors"
import { usePathname } from "next/navigation"
export const OverlayContainer = () => {
  const pathname = usePathname()
  const dispatch = useAppDispatch()

  const size = useAppSelector(selectOverlayIsSize)
  const type = useAppSelector(selectOverlayType)
  const payload = useAppSelector(selectOverlayPayload)
  const isOpen = useAppSelector(selectOverlayIsOpen)

  const isDesktop = useMediaQuery("(min-width: 1024px)")

   useEffect(() => {
    dispatch(closeOverlay())
  }, [pathname, dispatch])


  const handleOpenChange = (open: boolean) => {
    if (!open) {
      dispatch(closeOverlay())
    }
  }

  if (!type || !isOpen) {
    return null
  }

  let content: React.ReactNode = null
  let title = "Overlay"
  let description = "Overlay content"

  switch (type) {
    case "post-detail":
      title = "Post detail"
      description = "View post details and comments."
      content = <PostDetail postId={payload?.postId as number} />
      break

    case "likes":
      title = "Likes"
      description = "List of users who liked this post."
      content = <LikesList postId={payload?.postId as number} />
      break

    default:
      return null
  }

  if (isDesktop) {
    return (
      <DialogPanel
        open={isOpen}
        onOpenChange={handleOpenChange}
        title={title}
        description={description}
        size={size}
      >
        {content}
      </DialogPanel>
    )
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent
        side="bottom"
        className="h-134.5 border-[#181D27] bg-[#0A0D12] p-0"
      >
        <SheetTitle className="sr-only">{title}</SheetTitle>
        <SheetDescription className="sr-only">{description}</SheetDescription>
        {content}
      </SheetContent>
    </Sheet>
  )
}