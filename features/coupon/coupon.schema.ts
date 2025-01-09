import { z } from "zod";

export const createCouponSchema = z.object({
  code: z.string().min(5),
  validTill: z
    .date()
    .min(new Date(), { message: "valid date must be in future" }),
  isActive: z.boolean(),
});

const couponSchema = createCouponSchema.extend({
  _id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CreateCouponSchemaType = z.infer<typeof createCouponSchema>;
export type CouponType = z.infer<typeof couponSchema>;
