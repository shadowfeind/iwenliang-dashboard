import { string, z } from "zod";

export const createUserSchema = z.object({
  fullName: string().min(4).max(50),
  email: string().email(),
  userName: string().min(3).max(50),
  password: string().min(5).max(50),
  role: z.enum(["Admin", "User"]),
});

export const updateUserSchema = createUserSchema.pick({
  fullName: true,
  role: true,
});

export type CreateUserType = z.infer<typeof createUserSchema>;
export type UpdateUserType = z.infer<typeof updateUserSchema>;
