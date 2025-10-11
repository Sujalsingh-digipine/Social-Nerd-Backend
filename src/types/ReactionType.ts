import { ReactionType } from "../enums/ReactionEnum";
import { Post } from "./PostType";
import { User } from "./UserType";

export interface Reaction {
  _id: string;
  userId: User;
  postId: Post;
  reactionType: ReactionType;
  createdAt: Date;
}
