import { ImageOff } from "lucide-react"

export const TimelineEmptyState = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-neutral-400">
        <ImageOff size={20} />
      </div>

      <div className="space-y-1">
        <p className="text-sm font-medium text-white">No posts yet</p>
        <p className="text-sm text-neutral-400">
          Be the first to share something.
        </p>
      </div>
    </div>
  )
}