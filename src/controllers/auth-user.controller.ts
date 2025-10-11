import {
  _deleteUser,
  _getUserById,
  _getUsers,
  _updateUser,
  UserService,
} from "../services/user.service";
import { HttpStatus } from "../utils/http-status";
import { response } from "../utils/response";
import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { _comparePassword } from "../utils/Auth/hasher";
import { _generateToken } from "../utils/Auth/token.helper";
// import { Roles } from "../enums/Roles.Enum";

export const userController = async (req: Request, res: Response) => {
  try {
    const user = await UserService(req.body);
    return response(res, HttpStatus.CREATED, {
      message: "User Created Successfully",
      data: {
        _id: user._id,
        email: user.email,
        username: user.username,
      },
      success: true,
    });
  } catch (error: any) {
    return response(res, HttpStatus.BAD_REQUEST, {
      message: "Something went wrong to creating user",
      data: error.errors || null,
      success: false,
    });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;

    const exisitingUser = await _getUserById(id);
    if (!exisitingUser) {
      return response(res, HttpStatus.NOT_FOUND, {
        message: "User not found",
        data: null,
        success: false,
      });
    }

    const updateUser = await _updateUser(id, {
      username,
      email,
    });
    return response(res, HttpStatus.OK, {
      message: "User updated successfully",
      data: updateUser,
      success: true,
    });
  } catch (error: any) {
    return response(res, HttpStatus.INTERNAL_SERVER_ERROR, {
      message: "Unexpected error occured in user controller",
      data: error.errors,
      success: false,
    });
  }
};

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await _getUserById(id);

    if (!user) {
      return response(res, HttpStatus.NOT_FOUND, {
        message: "User not found",
        data: null,
        success: false,
      });
    }
    return response(res, HttpStatus.OK, {
      message: "User Fetched successfully",
      data: user,
      success: true,
    });
  } catch (error: any) {
    console.error("Error fetching user by Id", error);
    return response(res, HttpStatus.INTERNAL_SERVER_ERROR, {
      message: "Error fetching user controller",
      data: error.errors || null,
      success: false,
    });
  }
};

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await _getUsers(id);

    if (!user) {
      return response(res, HttpStatus.NOT_FOUND, {
        message: "User with this Id not found",
        data: null,
        success: false,
      });
    }

    return response(res, HttpStatus.OK, {
      message: "User Fetched successfully",
      data: user,
      success: true,
    });
  } catch (error: any) {
    console.error("Error fetching users ", error);
    return response(res, HttpStatus.INTERNAL_SERVER_ERROR, {
      message: "Error fetching user controller",
      data: error.errors || null,
      success: false,
    });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await _deleteUser(id);

    if (!user) {
      return response(res, HttpStatus.NOT_FOUND, {
        message: "User with this Id not found",
        data: null,
        success: false,
      });
    }
    return response(res, HttpStatus.OK, {
      message: "User deleted successfully",
      data: user,
      success: true,
    });
  } catch (error: any) {
    console.error("Error deleting user ", error);
    return response(res, HttpStatus.INTERNAL_SERVER_ERROR, {
      message: "Error deleting user controller",
      data: null,
      success: false,
    });
  }
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const exisitingUser = await UserModel.findOne({ email });

    if (!exisitingUser) {
      return response(res, HttpStatus.BAD_REQUEST, {
        message: "This Email is Not Register with us Please Register First",
        data: null,
        success: false,
      });
    }

    const checkPassword = await _comparePassword(
      password,
      exisitingUser.password
    );
    if (!checkPassword) {
      return response(res, HttpStatus.BAD_REQUEST, {
        message: "Invalid Password",
        data: null,
        success: false,
      });
    }

    const payload = { id: exisitingUser._id, roles: exisitingUser.roles };
    const token = _generateToken(payload);
    console.log(exisitingUser.username);
    return response(res, HttpStatus.OK, {
      message: "Login Successfull",
      data: {
        token,
        user: {
          id: exisitingUser._id,
          name: exisitingUser.username,
          email: exisitingUser.email,
          roles: exisitingUser.roles,
        },
      },
      success: true,
    });
  } catch (error: any) {
    console.error("Error login controller ", error);
    return response(res, HttpStatus.INTERNAL_SERVER_ERROR, {
      message: "Error login controller",
      data: null,
      success: false,
    });
  }
};
