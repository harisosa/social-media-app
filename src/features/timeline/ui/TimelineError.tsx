type TimelineErrorStateProps = {
  message?: string
  onRetry: () => void
  isRetrying?: boolean
}

export const TimelineErrorState = ({
  message = "Something went wrong while loading posts.",
  onRetry,
  isRetrying = false,
}: TimelineErrorStateProps) => {
  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center gap-4 px-4 py-10 text-center sm:px-5 md:px-6">
      <div className="space-y-1">
        <h2 className="text-base font-semibold text-white">
          Failed to load timeline
        </h2>
        <p className="text-sm text-neutral-400">{message}</p>
      </div>

      <button
        type="button"
        onClick={onRetry}
        disabled={isRetrying}
        className="rounded-full border border-neutral-800 bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isRetrying ? "Retrying..." : "Retry"}
      </button>
    </div>
  )
}