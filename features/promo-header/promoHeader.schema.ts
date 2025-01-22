import { z } from "zod";

export const createPromoHeaderSchema = z.object({
  title: z.string(),
  isActive: z.boolean().default(false),
});

const promoHeaderSchema = createPromoHeaderSchema.extend({
  _id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type CreatePromoHeaderType = z.infer<typeof createPromoHeaderSchema>;
export type PromoHeaderType = z.infer<typeof promoHeaderSchema>;
