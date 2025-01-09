import { z } from "zod";
import { DiscountType } from "./coupon.model";

export const createCouponSchema = z.object({
  code: z.string().min(5),
  validTill: z
    .date()
    .min(new Date(), { message: "valid date must be in future" }),
  isActive: z.boolean(),
  discountType: z.nativeEnum(DiscountType),
  discountValue: z.coerce.number(),
});

const couponSchema = createCouponSchema.extend({
  _id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CreateCouponSchemaType = z.infer<typeof createCouponSchema>;
export type CouponType = z.infer<typeof couponSchema>;
