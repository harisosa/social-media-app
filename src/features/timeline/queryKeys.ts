export const timelineQueryKeys = {
  all: ["timeline"] as const,
  infinite: (limit: number) =>
    [...timelineQueryKeys.all, "infinite", { limit }] as const,
}