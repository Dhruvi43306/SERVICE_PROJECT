import z from "zod";

export const registerSchema = z.object({
    FirstName: z
    .string()
    .min(2,"First name must be at least 2 characters")
    .max(50)
    .regex(/^[A-Za-z]+$/,"First name must contain only letters"),

    LastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50)
    .regex(/^[A-Za-z]+$/, "Last name must contain only letters"),

    Email: z
    .string()
    .email("Invalid email format")
    .toLowerCase()
    .trim(),

    Password:z
    .string()
    .min(8,"Password must be at least 8 characters")
    .max(100)
    .regex(/[A-Z]/,"Must contain at least one uppercase letter")
    .regex(/[a-z]/,"Must contain at least one lowercase letter")
    .regex(/[0-9]/,"Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character")
    .refine((val)=> !/\s/.test(val),{
        message:"Password must not contain spaces"
    })
})

export const loginSchema = z.object({
  Email: z.string().email("Invalid email format"),
  Password: z.string().min(8, "Password must be at least 8 characters")
})