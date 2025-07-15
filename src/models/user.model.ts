import mongoose, { Schema } from "mongoose";
import { UserStatus } from "../enums/UserStatus";
import { User } from "../types/UserType";

const UserSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    isPrivate: {
      type: Boolean,
      required: true,
      default: false,
    },
    roles: {
      type: [String],
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.Active,
    },
    friends: [
      {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
      },
    ],
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const UserModel = mongoose.model<User>("User", UserSchema);
