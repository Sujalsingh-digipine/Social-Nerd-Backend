import express from "express";
import {
  createPostController,
  deletePostController,
  getPostByIdController,
  getPostsController,
  updatePostController,
} from "../controllers/post.controller";
import { authenticate } from "../middlewares/auth-user.middleware";
import { authorizationRoles } from "../middlewares/authorization.middleware";
import { Roles } from "../enums/Roles.Enum";

export const postRouter = express.Router();
postRouter.post("/", authenticate, createPostController);
postRouter.get("/", getPostsController);
postRouter.get("/:id", getPostByIdController);
postRouter.put("/:id", updatePostController);
postRouter.delete(
  "/:id",
  authenticate,
  authorizationRoles(Roles.Admin),
  deletePostController
);
