import { filterInfiniteCollection } from "./infiniteCollection";

type PostItem = {
  id: number;
};

export const removePostFromInfiniteData = <TItem extends PostItem>(
  old: unknown,
  postId: number,
) => {
  return filterInfiniteCollection<TItem>(old, (item) => item.id !== postId);
};