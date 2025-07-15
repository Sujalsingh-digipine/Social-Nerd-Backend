import mongoose, { Schema } from "mongoose";
import { Post } from "../types/PostType";

const PostSchema = new Schema<Post>(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    video: {
      type: String,
      required: false,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reaction",
      },
    ],
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

export const PostModel = mongoose.model("Post", PostSchema);
