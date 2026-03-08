import { postQueryKeys } from "@/features/post/queryKeys"
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

export const updateFollowStateInPostLikesCaches = ({
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