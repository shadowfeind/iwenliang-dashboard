import mongoose, { Document } from "mongoose";

export enum DiscountType {
  FIXED = "FIXED",
  PERCENT = "PERCENT",
}
interface ICoupon extends Document {
  code: string;
  validTill: Date;
  isActive?: boolean;
  discountType: DiscountType;
  discountValue: number;
  createdAt: Date;
  updatedAt: Date;
}

const couponSchema = new mongoose.Schema<ICoupon>(
  {
    code: { type: String, required: [true, "Name is required"], unique: true },
    validTill: { type: Date, required: [true, "Validity date is required"] },
    isActive: { type: Boolean, default: false },
    discountType: {
      type: String,
      enum: Object.values(DiscountType),
    },
    discountValue: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Coupon =
  mongoose.models?.Coupon || mongoose.model<ICoupon>("Coupon", couponSchema);
export default Coupon;
