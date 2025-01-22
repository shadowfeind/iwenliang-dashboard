import mongoose, { Document } from "mongoose";

interface IPromoHeader extends Document {
  title: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const promoHeaderSchema = new mongoose.Schema<IPromoHeader>(
  {
    title: { type: String, required: true },
    isActive: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const PromoHeader =
  mongoose.models?.PromoHeader ||
  mongoose.model<IPromoHeader>("PromoHeader", promoHeaderSchema);
export default PromoHeader;
