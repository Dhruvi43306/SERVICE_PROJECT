export type LoginResponse =
  | { error: true; message: string }
  | {
      error: false;
      token: string;
      role: string;
      message: string;
      isVerified: boolean;
      user: {
        UserID: number;
        FullName: string;
        Role: string;
        IsActive:number
      };
};