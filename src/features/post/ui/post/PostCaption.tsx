import { Caption } from "@/components/ui/caption"

type PostCaptionProps = {
  username: string
  caption: string
}


export const PostCaption = ({
  username,
  caption,
}: PostCaptionProps) => {
  return (
    <div className="px-1">
      <p className="text-sm leading-6 text-white">
        <span className="mr-2 font-semibold">{username}</span>
      {caption && <Caption caption={caption}/>}
      </p>
    </div>
  )
}