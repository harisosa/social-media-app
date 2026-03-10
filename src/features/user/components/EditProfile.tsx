'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { EditProfileForm } from '@/features/user/components/EditProfileForm'

export const EditProfileComponent: React.FC = () => {
  const router = useRouter()

  return (
    <section className="w-full px-4 pb-8 pt-4 md:px-6">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <header className="flex items-center gap-3 border-b border-neutral-800 pb-4">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full text-white hover:bg-white/10 hover:text-white"
            onClick={() => router.back()}
          >
            <ArrowLeft className="size-5" />
          </Button>

          <h1 className="text-lg font-semibold text-white md:text-xl">
            Edit Profile
          </h1>
        </header>

        <EditProfileForm />
      </div>
    </section>
  )
}