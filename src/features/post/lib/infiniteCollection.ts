import type { InfiniteData } from "@tanstack/react-query";

type InfinitePageWithItems<TItem> = {
  items: TItem[];
  pagination?: unknown;
};

type InfinitePageWithPosts<TItem> = {
  posts: TItem[];
  pagination?: unknown;
};

type InfinitePageWithUsers<TItem> = {
  users: TItem[];
  pagination?: unknown;
};

export type InfinitePage<TItem> =
  | InfinitePageWithItems<TItem>
  | InfinitePageWithPosts<TItem>
  | InfinitePageWithUsers<TItem>;

export type InfiniteCollectionData<TItem> = InfiniteData<InfinitePage<TItem>>;

const hasItems = <TItem,>(
  page: InfinitePage<TItem>,
): page is InfinitePageWithItems<TItem> => {
  return "items" in page && Array.isArray(page.items);
};

const hasPosts = <TItem,>(
  page: InfinitePage<TItem>,
): page is InfinitePageWithPosts<TItem> => {
  return "posts" in page && Array.isArray(page.posts);
};

const hasUsers = <TItem,>(
  page: InfinitePage<TItem>,
): page is InfinitePageWithUsers<TItem> => {
  return "users" in page && Array.isArray(page.users);
};

export const mapInfiniteCollection = <TItem>(
  old: unknown,
  mapper: (item: TItem) => TItem,
): InfiniteCollectionData<TItem> | undefined => {
  if (!old || typeof old !== "object") {
    return undefined;
  }

  const data = old as InfiniteCollectionData<TItem>;

  if (!Array.isArray(data.pages)) {
    return data;
  }

  return {
    ...data,
    pages: data.pages.map((page) => {
      if (hasItems(page)) {
        return {
          ...page,
          items: page.items.map(mapper),
        };
      }

      if (hasPosts(page)) {
        return {
          ...page,
          posts: page.posts.map(mapper),
        };
      }

      if (hasUsers(page)) {
        return {
          ...page,
          users: page.users.map(mapper),
        };
      }

      return page;
    }),
  };
};

export const filterInfiniteCollection = <TItem>(
  old: unknown,
  predicate: (item: TItem) => boolean,
): InfiniteCollectionData<TItem> | undefined => {
  if (!old || typeof old !== "object") {
    return undefined;
  }

  const data = old as InfiniteCollectionData<TItem>;

  if (!Array.isArray(data.pages)) {
    return data;
  }

  return {
    ...data,
    pages: data.pages.map((page) => {
      if (hasItems(page)) {
        return {
          ...page,
          items: page.items.filter(predicate),
        };
      }

      if (hasPosts(page)) {
        return {
          ...page,
          posts: page.posts.filter(predicate),
        };
      }

      if (hasUsers(page)) {
        return {
          ...page,
          users: page.users.filter(predicate),
        };
      }

      return page;
    }),
  };
};