import { FriendshipStatus } from "../enums/FriendEnum";
import { User } from "./UserType";

export interface Friendship {
  _id: string;
  requestId: string | User;
  receiverId: string | User;
  status: FriendshipStatus;
  createdAt: Date;
}
