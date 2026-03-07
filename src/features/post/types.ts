export type PostModel = {
  id: number;
  imageUrl: string;
  caption: string;
  createdAt: string;
  author: TimelineAuthor;
  likeCount: number;
  commentCount: number;
  likedByMe: boolean;
  isSaved: boolean;
};

export type TimelineAuthor = {
  id: number;
  username: string;
  name: string;
  avatarUrl: string | null;
};

export type PostLikesUser = {
  id: number;
  username: string;
  name: string;
  avatarUrl: string | null;
  isFollowedByMe: boolean;
  isMe: boolean;
  followsMe: boolean;
};

export type PostLikesPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type PostLikesData = {
  users: PostLikesUser[];
  pagination: PostLikesPagination;
};

export type TogglePostLikeData = {
  liked: boolean;
  likeCount: number;
};

export type TogglePostSaveData = {
  saved: boolean;
};
