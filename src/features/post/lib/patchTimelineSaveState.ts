import { mapInfiniteCollection } from "./infiniteCollection";

type SaveableEntity = {
  id: number;
  isSaved: boolean;
};

export const patchTimelineSaveState = <TItem extends SaveableEntity>(
  old: unknown,
  postId: number,
  isSaved: boolean,
) => {
  return mapInfiniteCollection<TItem>(old, (item) => {
    if (item.id !== postId) {
      return item;
    }

    return {
      ...item,
      isSaved: !isSaved,
    };
  });
};