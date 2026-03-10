export const followQueryKeys = {
  all: ['follow'] as const,

  followers: (username: string) =>
    [...followQueryKeys.all, 'followers', username] as const,

  followersList: (username: string, limit: number) =>
    [...followQueryKeys.followers(username), 'list', { limit }] as const,

  following: (username: string) =>
    [...followQueryKeys.all, 'following', username] as const,

  followingList: (username: string, limit: number) =>
    [...followQueryKeys.following(username), 'list', { limit }] as const,
}