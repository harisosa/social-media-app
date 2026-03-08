"use client"

import { X } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"

import { cn } from "@/lib/utils"

type DialogPanelSize = "sm" | "md" | "lg"

type DialogPanelProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  size?: DialogPanelSize
  children: React.ReactNode
}

const sizeMap: Record<DialogPanelSize, string> = {
  sm: "max-w-85",
  md: "max-w-124",
  lg: "max-w-[640px]",
}

export const DialogPanel = ({
  open,
  onOpenChange,
  title,
  description,
  size = "md",
  children,
}: DialogPanelProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="overflow-visible border-none bg-transparent p-0 shadow-none"
      >
        {title && <DialogTitle className="sr-only">{title}</DialogTitle>}

        {description && (
          <DialogDescription className="sr-only">
            {description}
          </DialogDescription>
        )}

        <button
          type="button"
          onClick={() => onOpenChange(false)}
          aria-label="Close dialog"
          className="
            absolute
            right-0
            -top-11.25
            z-10
            inline-flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-transparent
            text-white/70
            transition
          "
        >
          <X className="size-6" />
        </button>

        <div
          className={cn(
            `
            w-[calc(100vw-32px)]
            rounded-3xl
            border border-[#181D27]
            bg-[#0A0D12]
            px-3
            pb-4
            pt-5
            text-white
            shadow-[0_20px_80px_rgba(0,0,0,0.5)]
            `,
            sizeMap[size]
          )}
        >
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}