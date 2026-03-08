export const UserRowSkeleton = () => {
  return (
    <div className="flex items-center gap-3 rounded-xl px-2 py-2 animate-pulse">
      <div className="h-12 w-12 rounded-full bg-neutral-800" />

      <div className="flex flex-col gap-2">
        <div className="h-3 w-32 rounded bg-neutral-800" />
        <div className="h-3 w-20 rounded bg-neutral-800" />
      </div>
    </div>
  )
}