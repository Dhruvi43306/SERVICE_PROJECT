import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { User } from "../type/users.type";
import { db } from "../db/mysql";
import bcrypt from "bcrypt";
import { verifyMail } from "../emailVerify/verifyMail";

interface OtpRow extends RowDataPacket {
  OtpCode: string | null;
  OtpExpires: Date | null;
}
interface ResetRow extends RowDataPacket {
  ResetToken: string;
}
export interface createGoogle {
  FullName: string;
  Email: string;
  googleId: string;
  profilePic: string;
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const [data] = await db.query(`SELECT * FROM users`);
    return data as User[];
  } catch (err) {
    console.log("MYSQL ERROR:", err);
    throw err;
  }
}

export async function getByIdUsers(id: number): Promise<User | null> {
  try {
    const [data] = await db.query(`SELECT * from users where UserID = ?`, [id]);
    const user = data as User[];
    return user.length > 0 ? user[0] : null;
  } catch (err) {
    console.log("MYSQL ERROR:", err);
    throw err;
  }
}

export async function getUserProfile(userId: number): Promise<User | null> {
  try {
    const [data] = await db.query(
      `SELECT UserID,UserCode,FullName,Email,Role,Phone,IsActive,Created
       FROM users
       WHERE UserID=?`,
      [userId],
    );

    const user = data as User[];
    return user.length > 0 ? user[0] : null;
  } catch (err) {
    console.log("MYSQL ERROR:", err);
    throw err;
  }
}

export async function UpdateUsers(
  formdata: User,
  id: number,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `UPDATE users SET FullName=?, Email=?, Role=?, Phone=?, IsActive=?, IsVerified=? WHERE UserID=?`,
      [
        formdata.FullName,
        formdata.Email,
        formdata.Role,
        formdata.Phone,
        formdata.IsActive,
        formdata.IsVerified,
        id,
      ],
    );
    return data;
  } catch (err) {
    console.log("MYSQL ERROR:", err);
    throw err;
  }
}

export async function DeleteUsers(id: number): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `DELETE FROM users WHERE UserID=?`,
      [id],
    );
    return data;
  } catch (err) {
    console.log("MYSQL ERROR:", err);
    throw err;
  }
}

export async function findByEmail(Email: String): Promise<User | null> {
  try {
    const [data] = await db.query(`SELECT * FROM users WHERE Email=?`, [Email]);
    const user = (await data) as User[];
    return user.length > 0 ? user[0] : null;
  } catch (err) {
    console.log("MYSQL ERROR:", err);
    throw err;
  }
}

export async function createUser(formdata: User): Promise<ResultSetHeader> {
  const userCode = "USR" + Math.floor(1000 + Math.random() * 9000);
  const hashedPassword = await bcrypt.hash(formdata.Password!, 10);
  const [data] = await db.query<ResultSetHeader>(
    `INSERT INTO users 
    (UserCode, FullName, Email, Password, Role, Phone, IsActive, Created, Modified,AccountExpires,FirstName,LastName)
    VALUES (?, ?, ?, ?, ?, ?, 1, NOW(), NOW(),DATE_ADD(NOW(), INTERVAL 1 HOUR),?,?)`,
    [
      userCode,
      formdata.FullName,
      formdata.Email,
      hashedPassword,
      formdata.Role,
      formdata.Phone,
      formdata.FirstName,
      formdata.LastName,
    ],
  );
  return data;
}
export async function updateExpiredUsers() {
  await db.query(
    `UPDATE users 
  SET IsActive = 0 
  WHERE AccountExpires < NOW()`,
  );
}

//save OTP
export async function saveOtp(
  userId: number,
  otp: string,
  expires: Date,
  email: string,
) {
  try {
    const hashedOtp = await bcrypt.hash(String(otp), 10);
    await db.query("UPDATE users SET OtpCode=?, OtpExpires=? WHERE UserID=?", [
      hashedOtp,
      expires,
      userId,
    ]);

    // Send email
    await verifyMail(otp, email);
    console.log("OTP sent to:", email, "OTP:", otp);
  } catch (err) {
    console.log("MYSQL ERROR:", err);
    throw err;
  }
}

// Verify OTP
export async function verifyOtp(userId: number, otp: string): Promise<Boolean> {
  try {
    const [data] = await db.query<OtpRow[]>(
      "SELECT OtpCode, OtpExpires FROM users WHERE UserID=?",
      [userId],
    );

    if (!data.length) return false;

    const { OtpCode, OtpExpires } = data[0];

    if (!OtpCode || !OtpExpires || new Date(OtpExpires) < new Date())
      return false;

    console.log("OTP entered:", otp);
    console.log("OTP hash from DB:", OtpCode);

    const isValid = await bcrypt.compare(String(otp), OtpCode);
    console.log("isValidManual:", isValid, "User entered OTP:", otp);
    return isValid;
  } catch (err) {
    console.log("MYSQL ERROR:", err);
    throw err;
  }
}

export async function markUserVerified(userId: number): Promise<User | null> {
  try {
    const [data] = await db.query(
      "UPDATE users SET IsVerified=1, OtpCode=NULL, OtpExpires=NULL WHERE UserID=?",
      [userId],
    );
    const user = data as User[];
    return user.length > 0 ? user[0] : null;
  } catch (err) {
    console.log("MYSQL ERROR:", err);
    throw err;
  }
}

export async function resendOtp(otp: string, id: number): Promise<User | null> {
  try {
    const hashedOtp = await bcrypt.hash(otp, 10);
    const expires = new Date(Date.now() + 1 * 60 * 1000);
    const [data] = await db.query(
      "UPDATE users SET OtpCode=?, OtpExpires=? WHERE UserID=?",
      [hashedOtp, expires, id],
    );
    const user = data as User[];
    return user.length > 0 ? user[0] : null;
  } catch (err) {
    console.log("MYSQL ERROR:", err);
    throw err;
  }
}

// ------------------- RESET OTP -------------------
export async function saveResetOtp(
  userId: number,
  otp: string,
  expires: string,
) {
  try {
    const hashedOtp = await bcrypt.hash(otp, 10);
    await db.query(
      "UPDATE users SET ResetToken=?, ResetExpires=? WHERE UserID=?",
      [hashedOtp, expires, userId],
    );
  } catch (err) {
    console.log("MYSQL ERROR:", err);
    throw err;
  }
}

export async function verifyResetOtp(
  userId: number,
  otp: string,
): Promise<Boolean> {
  try {
    const [data] = await db.query<ResetRow[]>(
      "SELECT ResetToken FROM users WHERE UserID=? AND ResetExpires > NOW()",
      [userId],
    );
    if (!data.length) return false;
    return await bcrypt.compare(otp, data[0].ResetToken);
  } catch (err) {
    console.log("MYSQL ERROR:", err);
    throw err;
  }
}

// ------------------- PASSWORD -------------------
export async function updatePassword(userId: number, newPassword: string) {
  try {
    const hashed = await bcrypt.hash(newPassword, 10);
    await db.query(
      `UPDATE users SET Password=?, ResetToken=NULL, ResetExpires=NULL WHERE UserID=?`,
      [hashed, userId],
    );
  } catch (err) {
    console.log("MYSQL ERROR:", err);
    throw err;
  }
}

// Find user by Google ID
export async function findByGoogleId(googleId: string): Promise<User | null> {
  try {
    const [data] = await db.query(`SELECT * FROM users WHERE googleId=?`, [
      googleId,
    ]);
    const user = data as User[];
    return user.length > 0 ? user[0] : null;
  } catch (err) {
    console.log("MYSQL ERROR:", err);
    throw err;
  }
}

export async function findByUser(id: number) {
  try {
    const [data] = await db.query(`SELECT * FROM users WHERE UserID=?`, [id]);
    const user = data as User[];
    return user.length > 0 ? user[0] : null;
  } catch (err) {
    console.log("MYSQL ERROR:", err);
    throw err;
  }
}

// Create new user from Google login
export async function createGoogleUser(
  FullName: string,
  Email: string,
  googleId: string,
  profilePic: string,
): Promise<ResultSetHeader> {
  try {
    const [data] = await db.query<ResultSetHeader>(
      `INSERT INTO users (FullName, Email, googleId, profilePic, IsActive, Created, Modified)
     VALUES (?, ?, ?, ?, 1, NOW(), NOW())`,
      [FullName, Email, googleId, profilePic],
    );
    return data;
  } catch (err) {
    console.log("MYSQL ERROR:", err);
    throw err;
  }
}

// Set Google ID for existing user
export async function SetGoogleUser(
  googleId: string,
  userId: number,
): Promise<User | null> {
  try {
    const [data] = await db.query(
      `UPDATE users SET googleId=?, provider='GOOGLE' WHERE UserID=?`,
      [googleId, userId],
    );
    const user = data as User[];
    return user.length > 0 ? user[0] : null;
  } catch (err) {
    console.log("MYSQL ERROR:", err);
    throw err;
  }
}
