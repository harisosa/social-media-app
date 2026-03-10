import { postQueryKeys } from "@/features/post/queryKeys"
import { usersQueryKeys } from "@/features/user/queryKeys"
import {  UserProfileResponse } from "@/features/user/types"
import type {
  InfiniteData,
  QueryClient,
  QueryKey,
} from "@tanstack/react-query"

type LikesUser = {
  id: number
  name: string
  username: string
  avatarUrl: string | null
  isFollowedByMe: boolean
}

type LikesPage = {
  users: LikesUser[]
  pagination?: unknown
}

type QuerySnapshot = [QueryKey, unknown]

const isLikesInfiniteData = (
  value: unknown
): value is InfiniteData<LikesPage> => {
  if (!value || typeof value !== "object") {
    return false
  }

  const candidate = value as InfiniteData<LikesPage>

  return Array.isArray(candidate.pages)
}

export const updateFollowStatesCaches = ({
  queryClient,
  userId,
  following,
}: {
  queryClient: QueryClient
  userId: number
  following: boolean
}) => {
  const snapshots = queryClient.getQueriesData({
    queryKey: postQueryKeys.all,
  }) as QuerySnapshot[]

  snapshots.forEach(([queryKey, data]) => {
    if (!isLikesInfiniteData(data)) {
      return
    }

    const hasLikesSegment = queryKey.some((segment) => segment === "likes")

    if (!hasLikesSegment) {
      return
    }

    queryClient.setQueryData<InfiniteData<LikesPage>>(queryKey, {
      ...data,
      pages: data.pages.map((page) => ({
        ...page,
        users: page.users.map((user) =>
          user.id === userId
            ? {
                ...user,
                isFollowedByMe: following,
              }
            : user
        ),
      })),
    })
  })

  return snapshots
}

export const getUserProfileFollowSnapshot = ({
  queryClient,
  username,
}: {
  queryClient: QueryClient
  username: string
}): QuerySnapshot => {
  const queryKey = usersQueryKeys.profile(username)
  const data = queryClient.getQueryData(queryKey)

  return [queryKey, data]
}

export const updateUserProfileFollowCache = ({
  queryClient,
  username,
  following,
}: {
  queryClient: QueryClient
  username: string
  following: boolean
}) => {
  queryClient.setQueryData<UserProfileResponse>(
    usersQueryKeys.profile(username),
    (old) => {
      if (!old) return old

      return {
        ...old,
        isFollowing: following,
        counts: {
          ...old.counts,
          followers: Math.max(
            0,
            old.counts.followers + (following ? 1 : -1)
          ),
        },
      }
    }
  )
}

export const rollbackFollowSnapshots = ({
  queryClient,
  snapshots,
}: {
  queryClient: QueryClient
  snapshots: QuerySnapshot[]
}) => {
  snapshots.forEach(([queryKey, data]) => {
    queryClient.setQueryData(queryKey, data)
  })
}