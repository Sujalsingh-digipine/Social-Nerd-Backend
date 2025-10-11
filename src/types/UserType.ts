import { Types } from "mongoose";
import { UserStatus } from "../enums/UserStatusEnum";

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  isPrivate: Boolean;
  avatar: string;
  roles: string[];
  status: UserStatus;
  friends: Types.ObjectId[];
  createdAt: Date;
  deletedAt?: Date;
}
