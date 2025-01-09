import mongoose, { Document } from "mongoose";

interface ICoupon extends Document {
  code: string;
  validTill: Date;
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const couponSchema = new mongoose.Schema<ICoupon>(
  {
    code: { type: String, required: [true, "Name is required"], unique: true },
    validTill: { type: Date, required: [true, "Validity date is required"] },
    isActive: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Coupon =
  mongoose.models?.Coupon || mongoose.model<ICoupon>("Coupon", couponSchema);
export default Coupon;
