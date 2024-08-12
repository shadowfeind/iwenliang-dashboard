import {string, z} from 'zod'

export const createUserSchema = z.object({
    fullName: string().min(4).max(50),
    email: string().email(),
    userName: string().min(3).max(50),
    password: string().min(5).max(50),
    role: z.enum(['Admin', 'User']),
  });