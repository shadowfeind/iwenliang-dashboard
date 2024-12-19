import { z } from "zod";

export const customerSchema = z.object({
  fullName: z.string().min(4).max(50),
  email: z.string().email(),
  phone: z.string().optional(),
  userName: z.string().optional(),
  password: z.string().min(5).max(50),
});

export type CustomerTypes = z.infer<typeof customerSchema>;
