type QueryKeySegment = string | number | boolean | Record<string, unknown> | null | undefined

export const isLikesQueryKey = (queryKey: readonly QueryKeySegment[]) => {
  return queryKey.some(segment => segment === 'likes')
}