'use client'

import { useMemo, useState } from 'react'
import { ProfileGridItem, ProfileTabItem, ProfileTabKey } from '@/features/user/types'
import { useMyPostsInfinite, useMyProfile, useMySavedPostsInfinite } from '@/features/user/hooks'
import { ProfileGrid, ProfileHeader, ProfileNav, ProfileStats, ProfileTabs } from '@/features/user/ui/profile'
import { Container } from '@/components/ui/container'
import GridIcon from '@/../public/icons/grid.svg';
import SaveIcon from '@/../public/icons/save.svg';
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/lib/hook'
import { openOverlay } from '@/features/ui/store'
import { LIMIT_PAGE } from '@/constants'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'


const PROFILE_TABS: ProfileTabItem[] = [
  { key: 'gallery', label: 'Gallery', icon: <Image src={GridIcon} alt="" className="size-5" /> },
  { key: 'saved', label: 'Saved', icon: <Image src={SaveIcon} alt="" className="size-5" /> },
];

export const MyProfileComponent = () => {
  const route = useRouter();
  const [activeTab, setActiveTab] = useState<ProfileTabKey>('gallery')
  const dispatch = useAppDispatch()
  const profileQuery = useMyProfile()
  const postsQuery = useMyPostsInfinite({ limit: LIMIT_PAGE })
  const savedPostsQuery = useMySavedPostsInfinite({ page: 1, limit: LIMIT_PAGE })

  const profile = profileQuery.data?.profile
  const stats = profileQuery.data?.stats

  const galleryItems = useMemo<ProfileGridItem[]>(() => {
    return (
      postsQuery.data?.pages.flatMap((page) =>
        page.items.map((post) => ({
          id: post.id,
          imageUrl: post.imageUrl,
          alt: post.caption || `Post ${post.id}`,
        }))
      ) ?? []
    )
  }, [postsQuery.data])

  const savedItems = useMemo<ProfileGridItem[]>(() => {
    return (
      savedPostsQuery.data?.pages.flatMap((page) =>
        page.posts.map((post) => ({
          id: post.id,
          imageUrl: post.imageUrl,
          alt: post.caption || `Saved post ${post.id}`,
        }))
      ) ?? []
    )
  }, [savedPostsQuery.data])

  const activeItems = activeTab === 'gallery' ? galleryItems : savedItems
  const activeQuery = activeTab === 'gallery' ? postsQuery : savedPostsQuery

  const handleEditProfile = () => {
    route.push('/profile/edit')
  }

  const handleShareProfile = () => {
    console.log('share profile')
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

  const onFollowersClick = () => {
    dispatch(
      openOverlay({
        type: 'followers',
        payload: { username: profile?.username },
        size: 'md',
      })
    )
  }

  const onFollowingClick = () => {
    dispatch(
      openOverlay({
        type: 'following',
        payload: { username: profile?.username },
        size: 'md',
      })
    )
  }

  return (
    <>
      <ProfileNav
        profile={profile}
        onBack={() => {
          route.back()
        }} />
      <Container size="profile">
        <div className="space-y-4 pb-24">
          <ProfileHeader

            profile={profile}
            primaryAction={
              <Button
                variant='outline'
                onClick={handleEditProfile}

                className={cn(
                  'h-12 flex-1 rounded-full border font-semibold w-32.5',
                )}
              >Edit Profile
              </Button>
            }
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
            posts={stats?.posts}
            followers={stats?.followers}
            following={stats?.following}
            likes={stats?.likes}
            isLoading={profileQuery.isPending}
            isError={profileQuery.isError}
            onRetry={() => {
              void profileQuery.refetch()
            }}
            onFollowersClick={onFollowersClick}
            onFollowingClick={onFollowingClick}
          />

          <div className="px-5 pb-6 lg:px-0">
            <ProfileTabs
              tabs={[...PROFILE_TABS]}
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
                  description: 'Share your first post to start your profile.',
                  actionLabel: 'Upload My First Post',
                  onAction: () => {
                    route.push('/post/create')
                  },
                }
                : {
                  title: 'No saved posts yet',
                  description: 'Posts you save will appear here.',
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