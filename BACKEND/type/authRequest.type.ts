import { Request } from "express";
import { User } from "./users.type";

export interface AuthRequest extends Request {
  user?: User;
}