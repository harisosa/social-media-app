'use client'

import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import { useDeletePost } from '../hooks/useDeletePost'
import { useAppDispatch } from '@/lib/hook'
import { closeOverlay } from '@/features/ui/store'

type DeletePostButtonProps = {
  postId: number;
  username?: string;
}

export const DeletePostButton = ({
  postId
}: DeletePostButtonProps) => {
  const deleteMutation = useDeletePost();
  const dispatch = useAppDispatch()

  const handleDelete = async () => {
     deleteMutation.mutate(postId)
    dispatch(closeOverlay())
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          aria-label="Delete post"
        >
            Delete
          <Trash2 size={18} />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>

        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete post?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your post.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending
              ? 'Deleting...'
              : 'Delete'}
          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  )
}