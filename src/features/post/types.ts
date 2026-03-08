import { User } from "@/features/user/types";
import { Pagination } from "@/types";

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

export type PostLikesUser = User &{
  isFollowedByMe: boolean;
  isMe: boolean;
  followsMe: boolean;
};

export type PostLikesData = {
  users: PostLikesUser[];
  pagination: Pagination;
};

export type TogglePostLikeData = {
  liked: boolean;
  likeCount: number;
};

export type TogglePostSaveData = {
  saved: boolean;
};
