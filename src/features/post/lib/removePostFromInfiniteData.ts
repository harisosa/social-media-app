type PostItem = {
  id: number
}

type InfinitePageWithItems<TItem> = {
  items: TItem[]
  pagination?: unknown
}

type InfinitePageWithPosts<TItem> = {
  posts: TItem[]
  pagination?: unknown
}

type InfinitePage<TItem> =
  | InfinitePageWithItems<TItem>
  | InfinitePageWithPosts<TItem>

export type InfiniteItemsData<TItem> = {
  pages: InfinitePage<TItem>[]
  pageParams: unknown[]
}

const hasItems = <TItem>(
  page: InfinitePage<TItem>,
): page is InfinitePageWithItems<TItem> => {
  return 'items' in page && Array.isArray(page.items)
}

const hasPosts = <TItem>(
  page: InfinitePage<TItem>,
): page is InfinitePageWithPosts<TItem> => {
  return 'posts' in page && Array.isArray(page.posts)
}

export const removePostFromInfiniteData = <TItem extends PostItem>(
  oldData: InfiniteItemsData<TItem> | undefined,
  postId: number,
): InfiniteItemsData<TItem> | undefined => {
  if (!oldData) return oldData

  return {
    ...oldData,
    pages: oldData.pages.map((page) => {
      if (hasPosts(page)) {
        return {
          ...page,
          posts: page.posts.filter((post) => post.id !== postId),
        }
      }

      if (hasItems(page)) {
        return {
          ...page,
          items: page.items.filter((item) => item.id !== postId),
        }
      }

      return page
    }),
  }
}