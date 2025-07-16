import { _verifyToken } from "../utils/Auth/token.helper";
import { HttpStatus } from "../utils/http-status";
import { response } from "../utils/response";
import { Request, Response, NextFunction } from "express";

export interface AuthenticatedRequest extends Request {
  user?: string;
  userRole?: string[];
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return response(res, HttpStatus.UNAUTHORIZED, {
      message: "Access Forbidden",
      success: false,
      data: null,
    });
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    return response(res, HttpStatus.UNAUTHORIZED, {
      message: "Invalid authorization header",
      success: false,
      data: null,
    });
  }

  try {
    const decode = _verifyToken(token);
    req.user = decode.id;
    req.userRole = decode.roles;
    next();
    // console.log("Decoded Token:", decode);
    console.log(decode.roles);
  } catch (error: any) {
    return response(res, HttpStatus.UNAUTHORIZED, {
      message: "Invalid Token",
      success: false,
      data: null,
    });
  }
};
