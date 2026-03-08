export const usersQueryKeys = {
  all: ["users"] as const,

  search: (q: string) => [...usersQueryKeys.all, "search", q] as const,

  searchPage: (q: string, page: number) =>
    [...usersQueryKeys.all, "search", q, page] as const,
}