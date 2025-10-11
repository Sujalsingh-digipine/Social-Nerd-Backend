import express from "express";
import {
  deleteUserController,
  getUserByIdController,
  getUsersController,
  loginController,
  updateUserController,
  userController,
} from "../controllers/auth-user.controller";
import { authenticate } from "../middlewares/auth-user.middleware";

export const userRouter = express.Router();
userRouter.post("/register", userController);
userRouter.put("/:id", updateUserController);
userRouter.get("/", authenticate, getUsersController);
userRouter.get("/:id", getUserByIdController);
userRouter.delete("/:id", deleteUserController);
userRouter.post("/login", loginController);
