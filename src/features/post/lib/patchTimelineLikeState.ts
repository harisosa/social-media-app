import { mapInfiniteCollection } from "./infiniteCollection";

type LikeableEntity = {
  id: number;
  likedByMe: boolean;
  likeCount: number;
};

type PatchTimelineLikeStateParams = {
  postId: number;
  liked?: boolean;
  likeCount?: number;
};

export const patchTimelineLikeState = <TItem extends LikeableEntity>(
  old: unknown,
  { postId, liked, likeCount }: PatchTimelineLikeStateParams,
) => {
  return mapInfiniteCollection<TItem>(old, (item) => {
    if (item.id !== postId) {
      return item;
    }

    return {
      ...item,
      likedByMe: liked ?? item.likedByMe,
      likeCount: likeCount ?? item.likeCount,
    };
  });
};