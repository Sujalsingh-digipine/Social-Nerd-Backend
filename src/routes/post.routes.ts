import express from "express";
import {
  createPostController,
  deletePostController,
  getPostByIdController,
  getPostsController,
  updatePostController,
} from "../controllers/post.controller";
import { authenticate } from "../middlewares/auth-user";

// test comment
export const postRouter = express.Router();
postRouter.post("/", authenticate, createPostController);
postRouter.get("/", getPostsController);
postRouter.get("/:id", getPostByIdController);
postRouter.put("/:id", updatePostController);
postRouter.delete("/:id", deletePostController);
