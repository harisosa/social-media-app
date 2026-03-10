'use client'

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { CreatePostPayload } from '@/features/post/types'
import { ImageUploader } from '@/features/post/ui/ImageUploader'
import { ImagePreview } from '@/features/post/ui/ImagePreview'


type CreatePostFormProps = {
  isSubmitting: boolean
  onSubmit: (payload: CreatePostPayload) => void
}

export const CreatePostForm = ({
  isSubmitting,
  onSubmit,
}: CreatePostFormProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [caption, setCaption] = useState('')

  const isSubmitDisabled = useMemo(() => {
    return !imageFile || isSubmitting
  }, [imageFile, isSubmitting])

  const handleSubmit = () => {
    if (!imageFile) return

    onSubmit({
      image: imageFile,
      caption: caption.trim(),
    })
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-white">Photo</p>

        {imageFile ? (
          <ImagePreview
            file={imageFile}
            onChange={setImageFile}
            onRemove={() => setImageFile(null)}
          />
        ) : (
          <ImageUploader onSelect={setImageFile} />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-white">Caption</p>

        <Textarea
          value={caption}
          onChange={(event) => setCaption(event.target.value)}
          placeholder="Create your caption"
          disabled={isSubmitting}
          className="min-h-24 resize-none rounded-xl border-neutral-800 bg-neutral-950 text-sm text-white placeholder:text-neutral-500 focus-visible:border-[#7751F9] focus-visible:ring-[#7751F9]/30"
        />
      </div>

      <Button
        type="button"
        disabled={isSubmitDisabled}
        onClick={handleSubmit}
        className="h-11 rounded-full bg-[#7751F9] text-sm font-semibold text-white hover:bg-[#6a45ea] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? 'Sharing...' : 'Share'}
      </Button>
    </div>
  )
}