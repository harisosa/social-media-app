import React from "react"

export const CommentSkeleton: React.FC = () => {
    return(
              <div>
        <div className="space-y-4">
          <div className="space-y-4">
            <div className="h-16 animate-pulse rounded-2xl bg-white/5" />
            <div className="h-16 animate-pulse rounded-2xl bg-white/5" />
            <div className="h-16 animate-pulse rounded-2xl bg-white/5" />
          </div>
        </div>
      </div>
    )
}