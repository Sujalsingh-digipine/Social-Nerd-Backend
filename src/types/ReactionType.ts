import { ReactionType } from "../enums/ReactionType";
import { Post } from "./PostType";
import { User } from "./UserType";

export interface Reaction {
  _id: string;
  userId: User;
  postId: Post;
  reactionType: ReactionType;
  createdAt: Date;
}
