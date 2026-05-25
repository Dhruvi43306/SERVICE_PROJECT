import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../type/authRequest.type";
import { User } from "../type/users.type";
export function authMiddlewear(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        error: true,
        message: "Unauthorized",
      });
    }
    const decoded = jwt.verify(token, "shhhhh") as User;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      error: true,
      message: "Invalid token",
    });
  }
}
