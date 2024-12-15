import { z } from "zod";

export const createBeadSizeSchema = z.object({
  name: z.string().min(3),
});

export type CreateBeadSizeSchemaType = z.infer<typeof createBeadSizeSchema>;
