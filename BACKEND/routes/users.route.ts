import express from "express";
import { Request, Response } from "express";

import {
  GetAllUsers,
  GetByIdUsers,
  UpdatedUsers,
  DeletedUsers,
  LoginUser,
  CreateUserByAdmin,
  ForgotPassword,
  ResetPassword,
  VerifyUserOtp,
  VerifyForgotOtp,
  ResendOTP,
  GoogleLogin,
  GetUserProfile,
} from "../services/users.service";
import jwt from "jsonwebtoken";
import { validate } from "../middlewear/validateMiddlwear";
import { loginSchema, registerSchema } from "../validation/user.validation";
import { da } from "zod/v4/locales";
import { LoginResponse } from "../type/loginResoponse.type";
import { findByUser } from "../models/users.model";
import { number } from "zod";

export const userRouter: express.Router = express.Router();
export type LoginUser = (
  email: string,
  password: string,
) => Promise<LoginResponse>;

//get all
userRouter.get("/", async (req: Request, res: Response) => {
  const data = await GetAllUsers();
  res.send(data);
});

// profile route FIRST
userRouter.get("/profile", async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        error: true,
        message: "Not logged in",
      });
    }

    const decoded = jwt.verify(token, "shhhhh") as any;

    const userId = decoded.UserID;
    const user = await findByUser(userId);

    if (!user || user.IsActive === 0) {
      return res.status(401).json({
        error: true,
        message: "Session expired",
      });
    }
    const data = await GetUserProfile(userId);
    res.json(data);
  } catch (err) {
    console.log("PROFILE ERROR:", err);
    res.status(500).json({
      error: true,
      message: "Server error",
    });
  }
});

// get by id AFTER profile
userRouter.get("/:id", async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  if (isNaN(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  const data = await GetByIdUsers(userId);
  res.send(data);
});

// PUBLIC ROUTES
userRouter.post(
  "/register",
  validate(registerSchema),
  async (req: Request, res: Response) => {
    try {
      req.body.Role = "REQUESTOR";

      const created = await CreateUserByAdmin(req.body);

      if (created.error) {
        return res.status(400).json(created);
      }
      const { Email, Password } = req.body;
      const loginData = await LoginUser(Email, Password);
      //Inside this block → error: true
      // After this block → error: false
      // So token exists safely.
      // This is called Discriminated Union Narrowing.

      if (loginData.error) {
        return res.status(400).json(loginData);
      }
      res.cookie("token", loginData.token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 60 * 60 * 1000,
      });

      res.json({
        error: false,
        message: "Registered & logged in. OTP sent to email",
        userId: created.UserID,
        isVerified: loginData.isVerified,
      });
    } catch (err) {
      console.error("REGISTER ERROR:", err);
      res.status(500).json({
        error: true,
        message: "Server error during registration",
      });
    }
  },
);

//login
userRouter.post(
  "/login",
  validate(loginSchema),
  async (req: Request, res: Response) => {
    const { Email, Password } = req.body;
    const data = await LoginUser(Email, Password);

    if (data.error) {
      return res.status(401).json(data);
    }

    res.cookie("token", data.token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 60 * 60 * 1000,
    });

    res.json({
      error: false,
      role: data.role,
      message: "Login success",
      user: data.user,
    });
  },
);

//forgot-otp
userRouter.post("/forgot-password", async (req: Request, res: Response) => {
  const data = await ForgotPassword(req.body.Email);
  res.json(data);
});

//verify-forogot-otp
userRouter.post("/verify-forgot-otp", async (req: Request, res: Response) => {
  const { userId, otp } = req.body;
  res.json(await VerifyForgotOtp(userId, otp));
});

//reset-password
userRouter.post("/reset-password", async (req: Request, res: Response) => {
  const { userId, password } = req.body;
  res.json(await ResetPassword(userId, password));
});

//logout
userRouter.post("/logout", (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  res.status(200).json({
    error: false,
    message: "Logged out successfully",
  });
});

//verify-otp
userRouter.post("/verify-otp", async (req: Request, res: Response) => {
  const { userId, otp } = req.body;
  const data = await VerifyUserOtp(userId, otp);
  res.json(data);
});

//resend-otp
userRouter.post("/resend-otp", async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const data = await ResendOTP(userId);
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send({ error: true });
  }
});

//google login
userRouter.post("/google-login", async (req: Request, res: Response) => {
  const { idToken } = req.body;
  const data = await GoogleLogin(idToken);
  if (data.error) {
    return res.status(401).json(data);
  }

  res.cookie("token", data.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 60 * 60 * 1000,
  });

  res.json({
    error: false,
    role: data.role,
    message: "Google login success",
  });
});

//updated
userRouter.put("/:id", async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  if (isNaN(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  const data = await UpdatedUsers(req.body, userId);
  res.send(data);
});

//delted
userRouter.delete("/:id", async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  if (isNaN(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  const data = await DeletedUsers(userId);
  res.send(data);
});
