export const commentsQueryKeys = {
  all: ["comments"] as const,
  byPost: (postId: number) => [...commentsQueryKeys.all, "post", postId] as const,
  list: (postId: number, limit: number) =>
    [...commentsQueryKeys.byPost(postId), "list", { limit }] as const,
}