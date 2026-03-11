type QueryKeySegment =
  | string
  | number
  | boolean
  | null
  | undefined
  | Record<string, unknown>;

export const isFollowListQueryKey = (queryKey: readonly QueryKeySegment[]) => {
  return queryKey.some(
    (segment) => segment === "followers" || segment === "following",
  );
};
