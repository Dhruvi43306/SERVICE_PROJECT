import {
  getAllUsers,
  getByIdUsers,
  DeleteUsers,
  findByEmail,
  createUser,
  UpdateUsers,
  resendOtp,
  saveResetOtp,
  verifyResetOtp,
  updatePassword,
  saveOtp,
  verifyOtp,
  markUserVerified,
  findByUser,
  findByGoogleId,
  createGoogleUser,
  SetGoogleUser,
  createGoogle,
  getUserProfile,
  updateExpiredUsers,
} from "../models/users.model";
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { verifyMail } from "../emailVerify/verifyMail";
import { generateOtp } from "../utils/generateOtp";
import { User } from "../type/users.type";
import { ResultSetHeader } from "mysql2";
import { LoginResponse } from "../type/loginResoponse.type";
import { string } from "zod";
type createGoogleUser = (
  FullName: string,
  Email: string,
  googleId: string,
  profilePic: string,
) => Promise<ResultSetHeader>;

export async function GetAllUsers() {
  const data = await getAllUsers();
  if (data) {
    return {
      error: false,
      data,
      message: "All User are SuccesFully Fached",
    };
  } else {
    return {
      error: true,
      message: "All User not are SuccesFully Fached",
    };
  }
}

export async function GetByIdUsers(id: number) {
  const data = await getByIdUsers(id);
  if (data) {
    return {
      error: false,
      data,
      message: "User are SuccesFully Fached By ID",
    };
  } else {
    return {
      error: true,
      message: "User not are SuccesFully Fached By ID",
    };
  }
}
export async function GetUserProfile(userId: number) {
  const data = await getUserProfile(userId);

  if (data) {
    return {
      error: false,
      data,
      message: "User profile fetched successfully",
    };
  } else {
    return {
      error: true,
      message: "User not found",
    };
  }
}

export async function UpdatedUsers(formdata: User, id: number) {
  const data = await UpdateUsers(formdata, id);
  if (data) {
    return {
      error: false,
      data,
      message: "User are SuccesFully Updated",
    };
  } else {
    return {
      error: true,
      message: "User not are SuccesFully Updated",
    };
  }
}

export async function DeletedUsers(id: number) {
  const data = await DeleteUsers(id);
  if (data) {
    return {
      error: false,
      data,
      message: "User are SuccesFully Deleted",
    };
  } else {
    return {
      error: true,
      message: "User not are SuccesFully Deleted",
    };
  }
}
export async function CreateUserByAdmin(formdata: User) {
  const existUser = await findByEmail(formdata.Email);

  if (existUser) {
    return {
      error: true,
      message: "User already exists",
    };
  }

  const allowedRoles = ["ADMIN", "HOD", "STAFF", "TECHNICIAN", "REQUESTOR"];
  if (!allowedRoles.includes(formdata.Role)) {
    return {
      error: true,
      message: "Invalid role",
    };
  }
  const otp = generateOtp();
  await verifyMail(otp, formdata.Email);

  const user = await createUser(formdata);
  const expires = new Date(Date.now() + 1 * 60 * 1000);

  await saveOtp(user.insertId, otp, expires, formdata.Email);
  console.log("Sending OTP to:", formdata.Email);

  return {
    error: false,
    message: "User created successfully by ADMIN.OTP sent to email",
    UserID: user.insertId,
  };
}

export async function VerifyUserOtp(userId: number, otp: string) {
  try {
    const valid = await verifyOtp(userId, otp);
    if (!valid) {
      console.log("OTP verification failed for user:", userId);
      return { error: true, message: "Invalid or expired OTP" };
    }
    await markUserVerified(userId);
    return { error: false, message: "Email verified successfully" };
  } catch (err: any) {
    console.error("VerifyUserOtp error:", err);
    return { error: true, message: err.message };
  }
}

export async function LoginUser(
  Email: string,
  Password: string,
): Promise<LoginResponse> {
  try {
    await updateExpiredUsers();
    const user = await findByEmail(Email);
    if (!user) {
      return { error: true, message: "User not found" };
    }
    if (user.IsActive === 0) {
      return { error: true, message: "Account expired" };
    }
    const ismatch = await bcrypt.compare(Password, user.Password!);
    if (!ismatch) {
      return { error: true, message: "Invalid email or password" };
    }
    const token = jwt.sign(
      { UserID: user.UserID, Email: user.Email, Role: user.Role },
      "shhhhh",
      { expiresIn: "1h" },
    );

    return {
      error: false,
      token,
      role: user.Role,
      message: "Login successful",
      isVerified: true,
      user: {
        UserID: user.UserID,
        FullName: user.FullName,
        Role: user.Role,
        IsActive: user.IsActive || 0,
      },
    };
  } catch (err: any) {
    console.error("Login Error:", err);
    return { error: true, message: err.message };
  }
}

export async function ForgotPassword(Email: string) {
  try {
    const user = await findByEmail(Email);
    if (!user) {
      return { error: true, message: "Email not registered" };
    }

    const otp = generateOtp();
    const expires = new Date(Date.now() + 1 * 60 * 1000);
    await saveResetOtp(user.UserID, otp, String(expires));
    await verifyMail(otp, user.Email);

    return {
      error: false,
      userId: user.UserID,
      message: "OTP sent to email",
    };
  } catch (err: any) {
    console.log("Forgot password error:", err);
    return { error: true, message: err.message };
  }
}

export async function VerifyForgotOtp(userId: number, otp: string) {
  try {
    const valid = await verifyResetOtp(userId, otp);
    console.log("Valid:", valid);
    if (!valid) {
      return { error: true, message: "Invalid or expired OTP" };
    }
    return { error: false, message: "OTP verified successfully" };
  } catch (err: any) {
    console.log(err);
    return { error: true, message: err.message };
  }
}

export async function ResetPassword(userId: number, password: string) {
  try {
    if (!password || password.length < 6) {
      return { error: true, message: "Password must be at least 6 characters" };
    }
    await updatePassword(userId, password);
    return { error: false, message: "Password updated successfully" };
  } catch (err: any) {
    console.log(err);
    return { error: true, message: err.message };
  }
}

export async function ResendOTP(id: number) {
  try {
    const newOtp = generateOtp();
    await resendOtp(newOtp, id);

    const user = await findByUser(id);
    if (!user) {
      return { error: true, message: "Email not found" };
    }
    await verifyMail(newOtp, user.Email);
    return {
      error: false,
      message: "OTP resent successfully",
    };
  } catch (err) {
    console.log("Resend OTP error:", err);
    return { error: true, message: "Server error" };
  }
}

export async function GoogleLogin(idToken: string) {
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email || !payload.sub) {
      return { error: true, message: "Invalid Google payload" };
    }

    const { sub, email, name, picture } = payload;
    const data: createGoogle = {
      FullName: name || "Google User",
      Email: email,
      googleId: sub,
      profilePic: picture ?? "",
    };
    // CHeck if Google ID already exists
    let user = await findByGoogleId(sub);

    if (!user) {
      const existingEmail = await findByEmail(email);

      if (existingEmail) {
        //  Email exists but Google not linked
        await SetGoogleUser(sub, existingEmail.UserID);
        user = existingEmail;
      } else {
        //  Completely new Google user
        const newUser = await createGoogleUser(
          data.FullName,
          data.Email,
          data.googleId,
          data.profilePic,
        );
        user = await getByIdUsers(newUser.insertId);
      }
    }

    if (!user) {
      return { error: true, message: "User creation failed" };
    }

    const token = jwt.sign(
      {
        UserID: user.UserID,
        Email: user.Email,
        Role: user.Role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
    );

    return {
      error: false,
      token,
      role: user.Role,
      message: "Google login successful",
    };
  } catch (err) {
    console.log("Google Login Error:", err);
    return { error: true, message: "Google authentication failed" };
  }
}
