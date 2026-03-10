'use client'

import { ArrowLeft, Send } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { cn, getInitials } from '@/lib/utils'

import type {
  ProfileHeaderAction,
  ProfileHeaderData,
  ProfileHeaderSecondaryAction,
} from '@/features/user/types'

type Props = {
  profile?: ProfileHeaderData
  primaryAction?: ProfileHeaderAction
  secondaryAction?: ProfileHeaderSecondaryAction
  isLoading?: boolean
  isError?: boolean
  onRetry?: () => void
  className?: string
}

export const ProfileHeader = ({
  profile,
  primaryAction,
  secondaryAction,
  isLoading = false,
  isError = false,
  onRetry,
  className,
}: Props) => {
  if (isLoading) {
    return (
      <section className={cn('w-full', className)}>
        <div className="border-b border-white/10 px-5 py-4 lg:hidden">
          <div className="flex items-center justify-between">
            <div className="h-6 w-32 animate-pulse rounded bg-white/5" />
            <div className="size-10 animate-pulse rounded-full bg-white/5" />
          </div>
        </div>

        <div className="px-5 py-5 lg:px-0">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <div className="size-16 animate-pulse rounded-full bg-white/5" />
              <div className="space-y-2">
                <div className="h-6 w-32 animate-pulse rounded bg-white/5" />
                <div className="h-4 w-24 animate-pulse rounded bg-white/5" />
              </div>
            </div>

            <div className="flex gap-3">
              <div className="h-11 flex-1 animate-pulse rounded-full bg-white/5" />
              <div className="size-11 animate-pulse rounded-full bg-white/5" />
            </div>

            <div className="h-4 w-48 animate-pulse rounded bg-white/5" />
          </div>
        </div>
      </section>
    )
  }

  if (isError || !profile) {
    return (
      <section className={cn('w-full px-5 py-5 lg:px-0', className)}>
        <div className="flex min-h-40 flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 px-6 py-8 text-center">
          <p className="text-base font-semibold text-white">
            Failed to load profile
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

  const primaryButtonClass =
    primaryAction?.variant === 'filled'
      ? 'border-transparent bg-[#7751F9] text-white hover:bg-[#6A45E8]'
      : 'border-white/10 bg-transparent text-white hover:bg-white/5'

  return (
    <section className={cn('w-full', className)}>

      <div className="flex flex-col px-5 py-5 gap-4 lg:px-0">
        <div className="flex flex-col lg:flex-row justify-between gap-5">
          <div className="flex items-center gap-4">
            <Avatar className="size-16 border border-white/10">
              <AvatarImage src={profile.avatarUrl ?? undefined} />
              <AvatarFallback>{getInitials(profile.name)}</AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <h1 className="truncate text-md font-bold text-white">
                {profile.name}
              </h1>

              <p className="truncate text-md font-normal text-white/70">{profile.username}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {primaryAction ? (
              <Button
                onClick={primaryAction.onClick}
                disabled={primaryAction.disabled}
                className={cn(
                  'h-11 flex-1 rounded-full border font-semibold',
                  primaryButtonClass,
                  primaryAction.className
                )}
              >
                {primaryAction.icon}
                {primaryAction.label}
              </Button>
            ) : null}

            {secondaryAction ? (
              <Button
                size="icon"
                variant="outline"
                aria-label={secondaryAction.ariaLabel}
                disabled={secondaryAction.disabled}
                onClick={secondaryAction.onClick}
                className={cn(
                  "size-12 rounded-full border-white/10 bg-transparent hover:bg-white/5 text-md font-bold",
                  secondaryAction.className
                )}
              >
                {secondaryAction.icon ?? <Send className="size-5" />}
              </Button>
            ) : null}
          </div>
        </div>
        {profile.bio ? (
          <p className="leading-relaxed text-white/80">{profile.bio}</p>
        ) : null}
      </div>
    </section>
  )
}