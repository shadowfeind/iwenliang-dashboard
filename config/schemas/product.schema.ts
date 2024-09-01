import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3),
  images: z.array(z.string()).optional(),
  description: z.string().nullable(),
  price: z.number(),
  salePrice: z.number(),
  stock: z.number(),
  category: z.array(z.string()),
});

export type ProductType = z.infer<typeof productSchema>;
