import mongoose, { Schema } from "mongoose";
import { Friendship } from "../types/FriendshipType";
import { FriendshipStatus } from "../enums/FriendEnum";

export const FriendShipSchema = new Schema<Friendship>(
  {
    requestId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(FriendshipStatus),
      default: FriendshipStatus.Pending,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);
