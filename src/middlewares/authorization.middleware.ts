import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/user.model";
import { response } from "../utils/response";
import { HttpStatus } from "../utils/http-status";
import { Roles } from "../enums/Roles.Enum";

interface AuthenticatedRequest extends Request {
  user?: string;
  userRole?: string[];
}

export const authorizationRoles = (...allowedRoles: Roles[]) => {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.user;
      const user = await UserModel.findById(id);

      if (
        !user ||
        !user.roles.some((role) => allowedRoles.includes(role as Roles))
      ) {
        return response(res, HttpStatus.FORBIDDEN, {
          message: "Access Forbidden : You don't have Permission",
          data: null,
          success: false,
        });
      }
      next();
    } catch (error: any) {
      return response(res, HttpStatus.INTERNAL_SERVER_ERROR, {
        message: "Failed to authorize role",
        data: null,
        success: false,
      });
    }
  };
};
