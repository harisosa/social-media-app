export type ProfileHeaderAction = {
  label: string
  onClick: () => void
  variant?: 'filled' | 'outline'
  disabled?: boolean
  icon?: React.ReactNode
  className?: string
}

export type ProfileHeaderSecondaryAction = {
  onClick: () => void
  ariaLabel: string
  disabled?: boolean
  icon?: React.ReactNode
  className?: string
}

export type ProfileHeaderData = {
  name: string
  username: string
  bio: string | null
  avatarUrl: string | null
}

export type ProfileGridItem = {
  id: number
  imageUrl: string
  alt?: string
}


export type ProfileTabKey = string

export type ProfileTabItem = {
  key: ProfileTabKey
  label: string
  icon?: React.ReactNode
}

export type ProfileGridEmptyState = {
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}