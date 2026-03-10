import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ProfileStatsProps = {
  posts?: number
  followers?: number
  following?: number
  likes?: number
  isLoading?: boolean
  isError?: boolean
  onRetry?: () => void
  className?: string
  onFollowersClick?: () => void
  onFollowingClick?: () => void
}

export const ProfileStats = ({
  posts,
  followers,
  following,
  likes,
  isLoading = false,
  isError = false,
  onRetry,
  className,
  onFollowersClick,
  onFollowingClick
}: ProfileStatsProps) => {
  if (isLoading) {
    return (
      <section
        className={cn('grid grid-cols-4 border-y border-white/10', className)}
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={cn(
              'flex flex-col items-center justify-center gap-2 px-2 py-4',
              index !== 0 && 'border-l border-white/10'
            )}
          >
            <div className="h-6 w-10 animate-pulse rounded bg-white/5" />
            <div className="h-4 w-14 animate-pulse rounded bg-white/5" />
          </div>
        ))}
      </section>
    )
  }

  if (
    isError ||
    posts === undefined ||
    followers === undefined ||
    following === undefined ||
    likes === undefined
  ) {
    return (
      <section className={cn('border-y border-white/10 px-5 py-4', className)}>
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 px-6 py-6 text-center">
          <p className="text-sm font-medium text-white/80">
            Failed to load stats
          </p>

          {onRetry ? (
            <Button
              type="button"
              variant="outline"
              onClick={onRetry}
              className="rounded-full border-white/10 bg-transparent text-white hover:bg-white/5 hover:text-white"
            >
              Try Again
            </Button>
          ) : null}
        </div>
      </section>
    )
  }

  return (
    <section
      className={cn('grid grid-cols-4 ', className)}
    >
      <StatItem label="Post" value={posts} />
      <StatItem label="Followers" value={followers} withDivider onClick={onFollowersClick} />
      <StatItem label="Following" value={following} withDivider onClick={onFollowingClick} />
      <StatItem label="Likes" value={likes} withDivider />
    </section>
  )
}

type StatItemProps = {
  label: string
  value: number
  withDivider?: boolean
  onClick?: () => void
}

const StatItem = ({ label, value, withDivider, onClick }: StatItemProps) => {
  return (
    <div
     onClick={onClick}
      className={cn(
        'flex flex-col items-center justify-center gap-1 px-2 py-4',
        withDivider && 'border-l border-white/10',
        onClick ? 'cursor-pointer' : ''
      )}
    >
      <span className="text-2xl font-bold leading-none text-white">{value}</span>
      <span className="text-sm text-white/60">{label}</span>
    </div>
  )
}