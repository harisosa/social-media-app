import type { QueryClient, QueryKey } from "@tanstack/react-query";

export const updateKnownInfiniteQueries = ({
  queryClient,
  queryKeys,
  updater,
}: {
  queryClient: QueryClient;
  queryKeys: QueryKey[];
  updater: (old: unknown) => unknown;
}) => {
  queryKeys.forEach((queryKey) => {
    queryClient.setQueryData(queryKey, updater);
  });
};