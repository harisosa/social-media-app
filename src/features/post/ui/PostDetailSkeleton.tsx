export const PostDetailSkeleton = () => {
    return (
        <div className="flex min-h-[85vh] flex-col lg:min-h-160 lg:flex-row">
            <div className="min-h-60 bg-white/5 sm:min-h-80 lg:min-h-0 lg:flex-1" />

            <div className="flex min-h-0 w-full flex-col border-t border-[#181D27] bg-[#0A0D12] lg:w-120 lg:border-l lg:border-t-0">
                <div className="flex flex-col gap-4 p-4">
                    <div className="h-12 animate-pulse rounded-xl bg-white/5" />
                    <div className="h-24 animate-pulse rounded-xl bg-white/5" />
                    <div className="flex-1 space-y-3">
                        <div className="h-16 animate-pulse rounded-xl bg-white/5" />
                        <div className="h-16 animate-pulse rounded-xl bg-white/5" />
                        <div className="h-16 animate-pulse rounded-xl bg-white/5" />
                    </div>
                    <div className="h-14 animate-pulse rounded-xl bg-white/5" />
                </div>
            </div>
        </div>
    )
}