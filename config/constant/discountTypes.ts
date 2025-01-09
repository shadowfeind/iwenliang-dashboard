import { DiscountType } from "@/features/coupon/coupon.model";

export const DISCOUNT_TYPE_OPTIONS = [
  { value: DiscountType.FIXED, label: "Fixed Amount" },
  { value: DiscountType.PERCENT, label: "Percentage" },
] as const;
