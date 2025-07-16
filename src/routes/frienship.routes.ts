import express from "express";
import {
  acceptFriendReqController,
  createFriendsController,
  getAllFriendReqController,
  getAllFriendsController,
  rejectFriendReqController,
} from "../controllers/friendship.controller";
import { authenticate } from "../middlewares/auth-user.middleware";

export const friendRouter = express.Router();
friendRouter.use(authenticate);
friendRouter.post("/send", createFriendsController);
friendRouter.put("/accept/:friendId", acceptFriendReqController);
friendRouter.put("/reject/:friendId", rejectFriendReqController);
friendRouter.get("/requests", getAllFriendReqController);
friendRouter.get("/all-friends", getAllFriendsController);
