import { Reaction } from "./ReactionType";
import { User } from "./UserType";

export interface Post {
  _id: string;
  createdBy: User | string;
  caption: string;
  images: string[];
  video: string;
  comments: string[];
  createdAt: Date;
  reactions: string[];
  deletedAt?: Date;
}
