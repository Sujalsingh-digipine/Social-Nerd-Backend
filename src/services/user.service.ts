import { error } from "console";
import { UserModel } from "../models/user.model";
import { User } from "../types/UserType";
import { _hashPassword } from "../utils/Auth/hasher";

export const UserService = async (data: Partial<User>) => {
  try {
    const { email, username, password, isPrivate, avatar } = data;
    if (!email || !username || !password) {
      throw error("All Fields are required");
    }

    const exisitingUser = await UserModel.findOne({ email });
    if (exisitingUser) {
      throw error("User already exists");
    }

    const hashedPassword = await _hashPassword(password);
    const avatarUrl =
      avatar ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        username
      )}&background=random`;

    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      isPrivate,
      avatar: avatarUrl,
      roles: ["user"],
      friends: [],
    });
    return user;
  } catch (error: any) {
    console.error("Error adding user service", error);
    throw error;
  }
};

export const _getUserById = async (id: string) => {
  try {
    const getUsers = await UserModel.findById(id).select("-password");
    return getUsers;
  } catch (error: any) {
    console.log("Error in getting user by id in user service", error);
    throw error;
  }
};

export const _updateUser = async (id: string, data: Partial<User>) => {
  try {
    const updatingUser = await UserModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatingUser;
  } catch (error: any) {
    console.log("Error in updating user in service:", error);
    throw error;
  }
};

export const _getUsers = async (id: string) => {
  try {
    const users = await UserModel.find().select("-password");
    return users;
  } catch (error: any) {
    console.log("Error in getting user in service", error);
    throw error;
  }
};

export const _deleteUser = async (id: string) => {
  try {
    const user = await UserModel.findByIdAndDelete(id);
    return user;
  } catch (error: any) {
    console.log("Error deleting user in service", error);
    throw error;
  }
};
