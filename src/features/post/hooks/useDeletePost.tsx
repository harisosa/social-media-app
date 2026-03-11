'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { removePostFromKnownCaches } from '../lib/removePostFromKnownCaches'
import { deletePost } from '@/features/post/api'
import { appToast } from '@/lib/toast'

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePost,
    onSuccess: (_, postId) => {
      removePostFromKnownCaches({
        queryClient,
        postId,
      })

      appToast.success('Post deleted')
    },
    onError: (err) => {
        console.log(err)
      appToast.error('Failed to delete post')
    },
  })
}