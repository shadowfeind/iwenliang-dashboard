import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(3),
  image: z.string().optional(),
});

export type CategoryType = z.infer<typeof categorySchema>;
