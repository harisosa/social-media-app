import type { InfiniteData } from "@tanstack/react-query";

type LikeableEntity = {
  id: number;
  likedByMe: boolean;
  likeCount: number;
};

type InfinitePageWithItems<TItem> = {
  items: TItem[];
  pagination?: unknown;
};

type InfinitePageWithPosts<TItem> = {
  posts: TItem[];
  pagination?: unknown;
};

type InfinitePage<TItem> =
  | InfinitePageWithItems<TItem>
  | InfinitePageWithPosts<TItem>;

export type InfiniteTimelineData<TItem> = InfiniteData<InfinitePage<TItem>>;

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

export const patchTimelineLikeState = <TItem extends LikeableEntity>(
  old: unknown,
  postId: number,
): InfiniteTimelineData<TItem> | undefined => {
  if (!old || typeof old !== "object") {
    return undefined;
  }

  const data = old as InfiniteTimelineData<TItem>;

  if (!Array.isArray(data.pages)) {
    return data;
  }

  return {
    ...data,
    pages: data.pages.map((page) => {
      if (hasItems(page)) {
        return {
          ...page,
          items: page.items.map((item) => {
            if (item.id !== postId) {
              return item;
            }

            const nextLikedByMe = !item.likedByMe;

            return {
              ...item,
              likedByMe: nextLikedByMe,
              likeCount: nextLikedByMe
                ? item.likeCount + 1
                : Math.max(0, item.likeCount - 1),
            };
          }),
        };
      }

      if (hasPosts(page)) {
        return {
          ...page,
          posts: page.posts.map((post) => {
            if (post.id !== postId) {
              return post;
            }

            const nextLikedByMe = !post.likedByMe;

            return {
              ...post,
              likedByMe: nextLikedByMe,
              likeCount: nextLikedByMe
                ? post.likeCount + 1
                : Math.max(0, post.likeCount - 1),
            };
          }),
        };
      }

      return page;
    }),
  };
};