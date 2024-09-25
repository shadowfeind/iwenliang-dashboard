import { z } from "zod";

export const materialSchema = z.object({
  name: z.string().min(3),
});

export type MaterialSchemaType = z.infer<typeof materialSchema>;
