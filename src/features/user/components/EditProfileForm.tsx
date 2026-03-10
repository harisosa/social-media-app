'use client'

import * as React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useMyProfile } from '@/features/user/hooks'
import { useUpdateProfile } from '@/features/user/hooks/useUpdateProfile'

type EditProfileFormValues = {
  name: string
  username: string
  email: string
  phone: string
  bio: string
}

export const EditProfileForm: React.FC = () => {
  const profileQuery = useMyProfile()
  const updateProfileMutation = useUpdateProfile()

  const profile = profileQuery.data?.profile

  const [avatarFile, setAvatarFile] = React.useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = React.useState<string>('')

  const [values, setValues] = React.useState<EditProfileFormValues>({
    name: '',
    username: '',
    email: '',
    phone: '',
    bio: '',
  })

  React.useEffect(() => {
    if (!profile) return

    setValues({
      name: profile.name ?? '',
      username: profile.username ?? '',
      email: profile.email ?? '',
      phone: profile.phone ?? '',
      bio: profile.bio ?? '',
    })

    setAvatarPreview(profile.avatarUrl ?? '')
  }, [profile])

  React.useEffect(() => {
    return () => {
      if (avatarPreview.startsWith('blob:')) {
        URL.revokeObjectURL(avatarPreview)
      }
    }
  }, [avatarPreview])

  const handleChange =
    (field: keyof EditProfileFormValues) =>
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const nextValue = event.target.value

      setValues((prev) => ({
        ...prev,
        [field]: nextValue,
      }))
    }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null

    if (!file) return

    if (avatarPreview.startsWith('blob:')) {
      URL.revokeObjectURL(avatarPreview)
    }

    setAvatarFile(file)
    setAvatarPreview(URL.createObjectURL(file))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    updateProfileMutation.mutate({
      name: values.name.trim(),
      username: values.username.trim(),
      bio: values.bio.trim(),
      phone: values.phone.trim(),
      avatar: avatarFile,
    })
  }

  const isPending = updateProfileMutation.isPending
  const isInitialLoading = profileQuery.isLoading && !profile
  const isDisabled = isPending || isInitialLoading

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-4">
        <div className="relative size-30 overflow-hidden rounded-full bg-neutral-900 ring-1 ring-white/10">
          {avatarPreview ? (
            <Image
              src={avatarPreview}
              alt={values.name || 'Profile avatar'}
              fill
              className="object-cover"
              sizes="120px"
              unoptimized={avatarPreview.startsWith('blob:')}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-neutral-400">
              No Photo
            </div>
          )}
        </div>

        <label className="inline-flex cursor-pointer items-center justify-center">
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handleAvatarChange}
            disabled={isDisabled}
          />

          <span className="inline-flex h-11 min-w-40 items-center justify-center rounded-full border border-neutral-800 bg-transparent px-6 text-sm font-medium text-white transition hover:bg-white/5 disabled:pointer-events-none disabled:opacity-50">
            Change Photo
          </span>
        </label>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="text-sm font-medium text-white"
          >
            Name
          </label>

          <Input
            id="name"
            value={values.name}
            onChange={handleChange('name')}
            disabled={isDisabled}
            placeholder="Enter your name"
            className="h-14 rounded-2xl border-neutral-800 bg-[#030712] text-base text-white placeholder:text-neutral-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="username"
            className="text-sm font-medium text-white"
          >
            Username
          </label>

          <Input
            id="username"
            value={values.username}
            onChange={handleChange('username')}
            disabled={isDisabled}
            placeholder="Enter your username"
            className="h-14 rounded-2xl border-neutral-800 bg-[#030712] text-base text-white placeholder:text-neutral-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-white"
          >
            Email
          </label>

          <Input
            id="email"
            value={values.email}
            readOnly
            disabled
            placeholder="Email"
            className="h-14 rounded-2xl border-neutral-800 bg-[#030712] text-base text-white placeholder:text-neutral-500 disabled:opacity-100"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="phone"
            className="text-sm font-medium text-white"
          >
            Number Phone
          </label>

          <Input
            id="phone"
            value={values.phone}
            onChange={handleChange('phone')}
            disabled={isDisabled}
            placeholder="Enter your phone number"
            className="h-14 rounded-2xl border-neutral-800 bg-[#030712] text-base text-white placeholder:text-neutral-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="bio"
            className="text-sm font-medium text-white"
          >
            Bio
          </label>

          <Textarea
            id="bio"
            value={values.bio}
            onChange={handleChange('bio')}
            disabled={isDisabled}
            placeholder="Write your bio"
            className="min-h-[132px] rounded-2xl border-neutral-800 bg-[#030712] px-4 py-3 text-base text-white placeholder:text-neutral-500"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isDisabled}
        className="h-14 rounded-full bg-[#7751F9] text-base font-semibold text-white hover:bg-[#6a45e6]"
      >
        {isPending ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  )
}