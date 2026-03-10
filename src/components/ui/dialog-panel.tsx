"use client"

import * as React from "react"
import { X } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"

import { cn } from "@/lib/utils"

export type DialogPanelSize = "sm" | "md" | "lg"

type DialogPanelProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  size?: DialogPanelSize
  children: React.ReactNode
  contentClassName?: string
  panelClassName?: string
}

const sizeMap: Record<DialogPanelSize, string> = {
  sm: "lg:max-w-85",
  md: "lg:max-w-124",
  lg: "lg:max-w-[1200px]",
}

export const DialogPanel = ({
  open,
  onOpenChange,
  title,
  description,
  size = "md",
  children,
  contentClassName,
  panelClassName,
}: DialogPanelProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "overflow-visible border-none bg-transparent p-0 shadow-none w-full max-w-[calc(100%-2rem)]",
          sizeMap[size],
          contentClassName
        )}
      >
        {title ? <DialogTitle className="sr-only">{title}</DialogTitle> : null}

        {description ? (
          <DialogDescription className="sr-only">
            {description}
          </DialogDescription>
        ) : null}

        <button
          type="button"
          onClick={() => onOpenChange(false)}
          aria-label="Close dialog"
          className="cursor-pointer absolute right-0 -top-11.25 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-white/70 transition hover:text-white"
        >
          <X className="size-6" />
        </button>

        <div
          className={cn(
            "w-[calc(100vw-32px)] text-white shadow-[0_20px_80px_rgba(0,0,0,0.5)]",
            "rounded-3xl border border-[#181D27] bg-[#0A0D12]",
            sizeMap[size],
            panelClassName
          )}
        >
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}