import Image from "next/image"

import { cn } from "@/lib/utils"

type PostMediaProps = {
  imageUrl: string
  alt: string
  priority?: boolean
  className?: string
  imageClassName?: string
  sizes?: string
}

export const PostMedia = ({
  imageUrl,
  alt,
  priority = false,
  className,
  imageClassName,
  sizes = "(max-width: 640px) 100vw, 560px",
}: PostMediaProps) => {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-[24px] bg-neutral-900",
        className
      )}
    >
      <div className="relative aspect-4/5 w-full sm:aspect-5/6">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn("object-cover", imageClassName)}
        />
      </div>
    </div>
  )
}