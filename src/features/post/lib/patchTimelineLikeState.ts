import { mapInfiniteCollection } from "./infiniteCollection";

type LikeableEntity = {
  id: number;
  likedByMe: boolean;
  likeCount: number;
};

export const patchTimelineLikeState = <TItem extends LikeableEntity>(
  old: unknown,
  postId: number,
) => {
  return mapInfiniteCollection<TItem>(old, (item) => {
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
  });
};