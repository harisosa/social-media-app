export const timelineQueryKeys = {
  all: ["timeline"] as const,

  explore: () => [...timelineQueryKeys.all, "feed"] as const,
  exploreInfinite: (limit: number) =>
    [...timelineQueryKeys.explore(), "infinite", { limit }] as const,
  infinite: (limit: number) =>
    [...timelineQueryKeys.all, "infinite", { limit }] as const,
};
