import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ProfileGridStateProps = {
  variant: 'empty' | 'error'
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export const ProfileGridState = ({
  variant,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: ProfileGridStateProps) => {
  const defaultActionLabel =
    variant === 'error' ? 'Try Again' : actionLabel

  return (
    <div
      className={cn(
        'flex min-h-60 flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 px-6 py-10 text-center',
        className
      )}
    >
      <div className="space-y-1">
        <p className="text-base font-semibold text-white">{title}</p>

        {description ? (
          <p className="text-sm text-white/60">{description}</p>
        ) : null}
      </div>

      {onAction && defaultActionLabel ? (
        <Button
          type="button"
          variant={variant === 'error' ? 'outline' : 'default'}
          onClick={onAction}
          className={cn(
            'rounded-full',
            variant === 'error'
              ? 'border-white/10 bg-transparent text-white hover:bg-white/5 hover:text-white'
              : 'bg-[#7751F9] text-white hover:bg-[#6A45E8]'
          )}
        >
          {defaultActionLabel}
        </Button>
      ) : null}
    </div>
  )
}