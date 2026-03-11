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
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { openOverlay } from '@/features/ui/store'
import { useRouter } from 'next/navigation'
import { selectIsAuthenticated } from '@/features/auth'
import { LIMIT_PAGE } from '@/constants'
import { FollowButton } from '@/features/follow/components/FollowButton'

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
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const profileQuery = useUserProfile(username)
  const postsQuery = useUserPostsInfinite({ username, limit: LIMIT_PAGE })
  const likedPostsQuery = useUserLikedPostsInfinite({ username, limit: LIMIT_PAGE })

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
        }} /><Container size="profile">
        <div className="space-y-4 pb-24">
          <ProfileHeader
            profile={profile}
            primaryAction={profile  && (<FollowButton user={profile} isFollow={profile.isFollowing}/>)}
            secondaryAction={isAuthenticated ? {
              ariaLabel: 'Share profile',
              onClick: handleShareProfile,
            }: undefined}
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
            }} 
            onFollowersClick={onFollowersClick}
            onFollowingClick={onFollowingClick}
            />

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