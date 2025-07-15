import { Post } from "./PostType";
import { User } from "./UserType";

export interface Comment {
  _id: string;
  postId: Post;
  authorId: User;
  text: string;
  parentId?: User;
  createdAt: Date;
}
