import { string, z } from "zod";

export const createUserSchema = z.object({
  fullName: string().min(4).max(50),
  email: string().email(),
  userName: string().min(3).max(50),
  password: string().min(5).max(50),
  role: z.enum(["Admin", "User"]),
});

export const updateUserSchema = z.object({
  fullName: string().min(4).max(50),
  email: string().email().optional(),
  userName: string().min(3).max(50).optional(),
  password: string().min(5).max(50).optional(),
  role: z.enum(["Admin", "User"]),
});

export const changePasswordSchema = z
  .object({
    password: string().min(5).max(50),
    confirmPassword: string().min(5).max(50),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    // path is where we show error
    path: ["confirmPassword"],
  });

export type CreateUserType = z.infer<typeof createUserSchema>;
export type UpdateUserType = z.infer<typeof updateUserSchema>;
export type ChangePasswordType = z.infer<typeof changePasswordSchema>;
