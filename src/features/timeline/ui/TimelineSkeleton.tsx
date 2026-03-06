export const TimelineListSkeleton = () => {
  return (
    <div className="mx-auto flex w-full flex-col gap-6 px-4 sm:px-5 md:gap-8 md:px-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex animate-pulse flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-neutral-800" />

              <div className="space-y-2">
                <div className="h-3 w-28 rounded-full bg-neutral-800" />
                <div className="h-3 w-16 rounded-full bg-neutral-900" />
              </div>
            </div>

            <div className="h-8 w-8 rounded-full bg-neutral-800" />
          </div>

          <div className="aspect-4/5 w-full rounded-[24px] bg-neutral-900 sm:aspect-5/6" />

          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-4">
              <div className="h-6 w-14 rounded-full bg-neutral-800" />
              <div className="h-6 w-14 rounded-full bg-neutral-800" />
              <div className="h-6 w-6 rounded-full bg-neutral-800" />
            </div>

            <div className="h-6 w-6 rounded-full bg-neutral-800" />
          </div>

          <div className="space-y-2 px-1">
            <div className="h-4 w-full rounded-full bg-neutral-800" />
            <div className="h-4 w-2/3 rounded-full bg-neutral-800" />
          </div>
        </div>
      ))}
    </div>
  )
}