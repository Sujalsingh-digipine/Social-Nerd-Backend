import { User } from "./UserType";

export interface ChatRoom {
  _id: string;
  participants: string[];
  CreatedBy: string | User;
  lastMessage: string;
  createdAt: Date;
}
