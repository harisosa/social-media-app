'use client'

import { useCreatePost } from '@/features/post/hooks/useCreatePost'
import { CreatePostForm } from '@/features/post/ui'


export const CreatePostComponent = () => {
  const createPostMutation = useCreatePost()

  return (
    <div className="w-full px-4 py-6">
      <div className="mx-auto w-full max-w-md">
        <CreatePostForm
          isSubmitting={createPostMutation.isPending}
          onSubmit={(payload) => createPostMutation.mutate(payload)}
        />
      </div>
    </div>
  )
}