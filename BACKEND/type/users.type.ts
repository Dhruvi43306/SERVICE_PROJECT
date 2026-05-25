// users.type.ts

export type UserRole = "ADMIN"| "HOD"| "TECHNICIAN"| "STAFF"| "REQUESTOR";

export type AuthProvider = "LOCAL"| "GOOGLE";

export interface User {
  UserID: number;
  UserCode: string;
  FullName: string;
  Email: string;
  Password?: string | null;   
  Role: UserRole; 
  Phone?: string | null;  
  IsActive?: number;       
  Created?: Date;           
  Modified?: Date;            
  ResetToken?: string | null;
  RsetExpires?: Date | null; 
  IsVerified?: boolean;       
  OtpCode: string;
  OtpExpires?: Date | null;
  LastLogin?: Date | null;
  otp_created_at?: Date | null;   
  googleId?: string | null;   
  provider?: AuthProvider;
  profilePic:String 
  AccountExpires:Date
  FirstName:string
  LastName:string
}