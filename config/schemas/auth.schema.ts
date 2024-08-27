import { z } from "zod";

export const authSchema = z.object({
  userName: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type AuthType = z.infer<typeof authSchema>;
