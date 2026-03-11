export const usersQueryKeys = {
  all: ["users"] as const,

  search: (q: string) => [...usersQueryKeys.all, "search", q] as const,

  searchPage: (q: string, page: number) =>
    [...usersQueryKeys.all, "search", q, page] as const,

  me: () => [...usersQueryKeys.all, "me"] as const,

  myProfile: () => [...usersQueryKeys.me(), "profile"] as const,

  myPosts: (limit: number) =>
    [...usersQueryKeys.me(), "posts", { limit }] as const,

  mySavedPosts: (limit: number) =>
    [...usersQueryKeys.me(), "saved-posts", { limit }] as const,

  profile: (username: string) =>
    [...usersQueryKeys.all, "profile", username] as const,

  posts: (username: string, limit: number) =>
    [...usersQueryKeys.all, "posts", username, { limit }] as const,
likes: (username: string, limit: number) =>
  [...usersQueryKeys.all, "likes", username, { limit }] as const
}