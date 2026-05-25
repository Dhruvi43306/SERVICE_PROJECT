import { User } from "../type/users.type"; // or wherever your User type is
declare global {
  namespace Express {
    interface Request {
      user?: User // or just `user: User` if always defined
    }
  }
}