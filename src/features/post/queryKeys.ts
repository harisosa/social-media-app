const POSTS = ["posts"] as const

export const postQueryKeys = {
  all: POSTS,

  likes: (postId: number) => [...POSTS, postId, "likes"] as const,

  likesInfinite: (postId: number, limit: number) =>
    [...POSTS, postId, "likes", "infinite", { limit }] as const,

  saved: [...POSTS, "saved"] as const,

  savedInfinite: (limit: number) =>
    [...POSTS, "saved", "infinite", { limit }] as const,
  detail: (postId: number) => [...POSTS, "detail", postId] as const,
}