'use client'

import { useEffect, useMemo } from 'react'
import Image from 'next/image'
import { ImageUp, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

type ImagePreviewProps = {
  file: File
  onChange: (file: File) => void
  onRemove: () => void
}

export const ImagePreview = ({
  file,
  onChange,
  onRemove,
}: ImagePreviewProps) => {
  const imageUrl = useMemo(() => URL.createObjectURL(file), [file])

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(imageUrl)
    }
  }, [imageUrl])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0]
    if (!nextFile) return

    onChange(nextFile)
    event.target.value = ''
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#030712]">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-black">
        <Image
          src={imageUrl}
          alt="Selected post image preview"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 448px"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 p-3">
        <label className="inline-flex">
          <input
            type="file"
            accept="image/png,image/jpeg"
            className="hidden"
            onChange={handleFileChange}
          />

          <Button
            type="button"
            variant="secondary"
            asChild
            className="h-9 rounded-full border border-white/10 bg-white/5 px-4 text-white hover:bg-white/10"
          >
            <span className="cursor-pointer">
              <ImageUp className="mr-2 h-4 w-4" />
              Change Image
            </span>
          </Button>
        </label>

        <Button
          type="button"
          variant="ghost"
          onClick={onRemove}
          className="h-9 rounded-full px-4 text-[#F43F5E] hover:bg-[#F43F5E]/10 hover:text-[#F43F5E]"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Image
        </Button>
      </div>
    </div>
  )
}