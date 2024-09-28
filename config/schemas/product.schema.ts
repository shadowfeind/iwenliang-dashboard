import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3),
  images: z.array(z.string()).optional(),
  description: z.string().optional(),
  price: z.coerce.number(),
  salePrice: z.coerce.number(),
  stock: z.coerce.number(),
  color: z.array(z.string()).optional(),
  material: z.array(z.string()).optional(),
  category: z.array(z.string()).optional(),
  featured: z.boolean(),
  isActive: z.boolean(),
});

export type ProductSchamaType = z.infer<typeof productSchema>;
