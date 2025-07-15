import mongoose, { Schema } from "mongoose";
import { Comment } from "../types/CommentType";

const CommentSchema = new Schema<Comment>(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      required: false,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export const CommentModel = mongoose.model<Comment>("Comment", CommentSchema);
