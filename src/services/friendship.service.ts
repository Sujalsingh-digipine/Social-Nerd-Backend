import { FriendshipStatus } from "../enums/FriendEnum";
import { FriendshipModel } from "../models/friendship.model";
import { UserModel } from "../models/user.model";

export const sendFriendReqService = async (
  requestId: string,
  receiverId: string
) => {
  try {
    const existingReq = await FriendshipModel.findOne({
      requestId,
      receiverId,
    });
    if (existingReq) throw new Error("Friend Request Already Sent");

    const newReq = await FriendshipModel.create({
      receiverId,
      requestId,
    });

    return newReq;
  } catch (error: any) {
    console.log("Error in SendReq service");
    throw error.message;
  }
};

export const acceptFriendReqService = async (friendId: string) => {
  try {
    const req = await FriendshipModel.findById(friendId);
    if (!req) throw new Error("Failed to accept request");

    req.status = FriendshipStatus.Accepted;
    await req.save();

    await UserModel.findByIdAndUpdate(req.requestId, {
      $addToSet: { friends: req.receiverId },
    });

    await UserModel.findByIdAndUpdate(req.receiverId, {
      $addToSet: { friends: req.requestId },
    });

    return req;
  } catch (error: any) {
    console.log("Error in accepting friend request service");
    throw error.message;
  }
};

export const rejectFriendReqService = async (friendId: string) => {
  try {
    const req = await FriendshipModel.findById(friendId);
    if (!req) throw new Error("Cant Find Friend Request");
    return req;
  } catch (error: any) {
    console.log("Error rejecting friend request");
    throw error.message;
  }
};

export const getAllFriendService = async (userId: string) => {
  try {
    const user = await UserModel.findById(userId).populate(
      "friends",
      "username avatar"
    );
    if (!user) throw new Error("user not found");
    return user;
  } catch (error: any) {
    console.log("Error getting All Friends Requests service");
    throw error.message;
  }
};

export const getAllFriendReqService = async (userId: string) => {
  try {
    const req = await FriendshipModel.find({
      requestId: userId,
      status: FriendshipStatus.Pending,
    }).populate("requestId", "username avatar");
    return req;
  } catch (error: any) {
    console.log("Error Getting all friend request service");
    throw error.message;
  }
};
