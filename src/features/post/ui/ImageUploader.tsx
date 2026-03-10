'use client'

import { ChangeEvent, DragEvent, useRef, useState } from 'react'
import { Upload } from 'lucide-react'
import { cn } from '@/lib/utils'

type ImageUploaderProps = {
  onSelect: (file: File) => void
  errorMessage?: string
}

const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg']
const MAX_FILE_SIZE_MB = 5
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024

export const ImageUploader = ({
  onSelect,
  errorMessage,
}: ImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const validateFile = (file: File) => {
    const isValidType = ACCEPTED_IMAGE_TYPES.includes(file.type)
    const isValidSize = file.size <= MAX_FILE_SIZE_BYTES

    return isValidType && isValidSize
  }

  const handleFile = (file: File | null | undefined) => {
    if (!file) return
    if (!validateFile(file)) return

    onSelect(file)
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFile(event.target.files?.[0])
    event.target.value = ''
  }

  const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    setIsDragging(false)

    handleFile(event.dataTransfer.files?.[0])
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLLabelElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      inputRef.current?.click()
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label
        role="button"
        tabIndex={0}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onKeyDown={handleKeyDown}
        className={cn(
          'flex min-h-33 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed bg-[#030712] px-4 py-6 text-center transition-colors',
          'border-[#1F2937]',
          'hover:border-[#7751F9] hover:bg-[#060b16]',
          'focus:outline-none focus-visible:border-[#7751F9]',
          isDragging && 'border-[#7751F9] bg-[#060b16]',
          errorMessage && 'border-[#E11D48] hover:border-[#E11D48]'
        )}
      >
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
          <Upload className="h-5 w-5 text-white" />
        </div>

        <p className="text-sm">
          <span className="font-medium text-[#7751F9]">Click to upload</span>
          <span className="text-[#717680]"> or drag and drop</span>
        </p>

        <p className="mt-2 text-xs text-[#717680]">
          PNG or JPG (max. {MAX_FILE_SIZE_MB}mb)
        </p>

        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg"
          className="hidden"
          onChange={handleInputChange}
        />
      </label>

      {errorMessage ? (
        <p className="text-sm text-[#E11D48]">{errorMessage}</p>
      ) : null}
    </div>
  )
}