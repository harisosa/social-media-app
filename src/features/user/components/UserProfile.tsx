'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'

import GridIcon from '@/../public/icons/grid.svg'
import LikeIcon from '@/../public/icons/love.svg'

import { Container } from '@/components/ui/container'
import {
  useUserLikedPostsInfinite,
  useUserPostsInfinite,
  useUserProfile,
} from '@/features/user/hooks'
import {
  ProfileGrid,
  ProfileHeader,
  ProfileNav,
  ProfileStats,
  ProfileTabs,
} from '@/features/user/ui/profile'
import type {
  ProfileGridItem,
  ProfileTabItem,
  ProfileTabKey,
} from '@/features/user/types'
import { useFollowUser } from '@/features/follow/hooks'
import { cn } from '@/lib/utils'
import { CheckCircle2, CircleIcon } from 'lucide-react'
import { useAppDispatch } from '@/lib/hook'
import { openOverlay } from '@/features/ui/store'
import { useRouter } from 'next/navigation'

type UserProfileComponentProps = {
  username: string
}

const PROFILE_TABS: ProfileTabItem[] = [
  {
    key: 'gallery',
    label: 'Gallery',
    icon: <Image src={GridIcon} alt="" className="size-5" />,
  },
  {
    key: 'liked',
    label: 'Liked',
    icon: <Image src={LikeIcon} alt="" className="size-5" />,
  },
]

export const UserProfileComponent = ({
  username,
}: UserProfileComponentProps) => {
  const route = useRouter();
  const [activeTab, setActiveTab] = useState<ProfileTabKey>('gallery')
  const dispatch = useAppDispatch()

  const profileQuery = useUserProfile(username)
  const postsQuery = useUserPostsInfinite({ username, limit: 9 })
  const likedPostsQuery = useUserLikedPostsInfinite({ username, limit: 9 })

  const followMutation = useFollowUser()


  const profile = profileQuery.data

  const galleryItems = useMemo<ProfileGridItem[]>(() => {
    return (
      postsQuery.data?.pages.flatMap((page) =>
        page.posts.map((post) => ({
          id: post.id,
          imageUrl: post.imageUrl,
          alt: post.caption || `Post ${post.id}`,
        }))
      ) ?? []
    )
  }, [postsQuery.data])

  const likedItems = useMemo<ProfileGridItem[]>(() => {
    return (
      likedPostsQuery.data?.pages.flatMap((page) =>
        page.posts.map((post) => ({
          id: post.id,
          imageUrl: post.imageUrl,
          alt: post.caption || `Liked post ${post.id}`,
        }))
      ) ?? []
    )
  }, [likedPostsQuery.data])

  const activeItems = activeTab === 'gallery' ? galleryItems : likedItems
  const activeQuery = activeTab === 'gallery' ? postsQuery : likedPostsQuery

  const handlePrimaryAction = async () => {
    if (!profile) return;

    if (profile?.isMe) {
      console.log('edit profile')
      return
    }
    await followMutation.mutateAsync({ userId: profile.id, username: profile.username, following: profile.isFollowing })
  }

  const handleShareProfile = () => {
    console.log('share profile', username)
  }

  const handleItemClick = (id: number) => {
    dispatch(
      openOverlay({
        type: 'post-detail',
        payload: { postId: id },
        size: 'lg',
      })
    )
  }

  return (
    <>
      <ProfileNav
        profile={profile}
        onBack={() => {
          route.back()
        }} /><Container size="profile">
        <div className="space-y-4 pb-24">
          <ProfileHeader
            profile={profile}
            primaryAction={{
              label: profile?.isFollowing ? 'Following' : 'Follow',
              onClick: handlePrimaryAction,
              className: cn('h-12 w-full sm:w-[130px]',
                !profile?.isFollowing ? 'bg-[#6936F2]' : ''
              ),

              icon: profile?.isFollowing ? (<CheckCircle2 className='size-4' />) : null
            }}
            secondaryAction={{
              ariaLabel: 'Share profile',
              onClick: handleShareProfile,
            }}
            isLoading={profileQuery.isPending}
            isError={profileQuery.isError}
            onRetry={() => {
              void profileQuery.refetch()
            }} />

          <ProfileStats
            posts={profile?.counts.post}
            followers={profile?.counts.followers}
            following={profile?.counts.following}
            likes={profile?.counts.likes}
            isLoading={profileQuery.isPending}
            isError={profileQuery.isError}
            onRetry={() => {
              void profileQuery.refetch()
            }} />

          <div className="px-5 pb-6 lg:px-0">
            <ProfileTabs
              tabs={PROFILE_TABS}
              activeTab={activeTab}
              onTabChange={setActiveTab} />

            <ProfileGrid
              items={activeItems}
              onItemClick={handleItemClick}
              isLoading={activeQuery.isPending}
              isError={activeQuery.isError}
              onRetry={() => {
                void activeQuery.refetch()
              }}
              emptyState={activeTab === 'gallery'
                ? {
                  title: 'No posts yet',
                  description: 'This user has not shared any posts yet.',
                }
                : {
                  title: 'No liked posts yet',
                  description: 'Posts liked by this user will appear here.',
                }}
              hasNextPage={activeQuery.hasNextPage}
              isFetchingNextPage={activeQuery.isFetchingNextPage}
              onLoadMore={() => {
                void activeQuery.fetchNextPage()
              }} />
          </div>
        </div>
      </Container></>
  )
}