import { AuthenticatedRequest } from "../middlewares/auth-user.middleware";
import { Request, Response } from "express";
import { response } from "../utils/response";
import { HttpStatus } from "../utils/http-status";
import {
  acceptFriendReqService,
  getAllFriendReqService,
  getAllFriendService,
  rejectFriendReqService,
  sendFriendReqService,
} from "../services/friendship.service";

export const createFriendsController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const reqId = req.user!;
    const { receiverId } = req.body;

    const data = await sendFriendReqService(reqId, receiverId);
    return response(res, HttpStatus.CREATED, {
      message: "Friend Request Sent Successfully",
      data,
      success: true,
    });
  } catch (error: any) {
    return response(res, HttpStatus.BAD_REQUEST, {
      message: error.message || "Error Sending Friend Request",
      data: null,
      success: false,
    });
  }
};

export const acceptFriendReqController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { friendId } = req.params;
    const data = await acceptFriendReqService(friendId);
    return response(res, HttpStatus.OK, {
      message: "Friend request accepted",
      data,
      success: true,
    });
  } catch (error: any) {
    return response(res, HttpStatus.BAD_GATEWAY, {
      message: error.message || "Error Accepting Friend Request",
      data: null,
      success: false,
    });
  }
};

export const rejectFriendReqController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { friendId } = req.params;
    const data = await rejectFriendReqService(friendId);
    return response(res, HttpStatus.OK, {
      message: "Friend request Rejected",
      data,
      success: true,
    });
  } catch (error: any) {
    return response(res, HttpStatus.BAD_GATEWAY, {
      message: error.message || "Error Rejecting Friend Request",
      data: null,
      success: false,
    });
  }
};

export const getAllFriendReqController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const id = req.user!;
    const data = await getAllFriendReqService(id);
    return response(res, HttpStatus.OK, {
      message: "All Friend Request Fetched",
      data,
      success: true,
    });
  } catch (error: any) {
    return response(res, HttpStatus.BAD_GATEWAY, {
      message: error.message || "Error Fetching All Friends Requests",
      data: null,
      success: false,
    });
  }
};

export const getAllFriendsController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const id = req.user!;
    const data = await getAllFriendService(id);
    return response(res, HttpStatus.OK, {
      message: "All Friends Request are fetched",
      data,
      success: true,
    });
  } catch (error: any) {
    return response(res, HttpStatus.BAD_REQUEST, {
      message: error.message || "All Friends are fetched",
      data: null,
      success: false,
    });
  }
};
