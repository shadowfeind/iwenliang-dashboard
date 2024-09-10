import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3),
  images: z.array(z.string()).optional(),
  description: z.string().optional(),
  price: z.coerce.number(),
  salePrice: z.coerce.number(),
  stock: z.coerce.number(),
  category: z.array(z.string()),
});

export type ProductType = z.infer<typeof productSchema>;
