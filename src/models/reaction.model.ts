import mongoose, { Schema } from "mongoose";
import { Reaction } from "../types/ReactionType";
import { ReactionEnum } from "../enums/ReactionEnum";

const ReactionSchema = new Schema<Reaction>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    reactionType: {
      type: String,
      required: true,
      enum: Object.values(ReactionEnum),
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

export const ReactionModel = mongoose.model<Reaction>(
  "Reaction",
  ReactionSchema
);
