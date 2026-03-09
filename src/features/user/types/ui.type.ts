export type ProfileHeaderAction = {
  label: string
  onClick: () => void
  variant?: 'filled' | 'outline'
  disabled?: boolean
  icon?: React.ReactNode
}

export type ProfileHeaderSecondaryAction = {
  onClick: () => void
  ariaLabel: string
  disabled?: boolean
  icon?: React.ReactNode
}

export type ProfileHeaderData = {
  name: string
  username: string
  bio: string | null
  avatarUrl: string | null
}