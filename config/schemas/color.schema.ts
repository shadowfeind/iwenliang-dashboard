import { z } from "zod";

export const createColorSchema = z.object({
  name: z.string().min(2),
  hexValue: z.string(),
});

export type CreateColorSchemaType = z.infer<typeof createColorSchema>;
