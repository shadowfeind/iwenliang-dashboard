import mongoose, { Document } from "mongoose";

export interface IShippingPrice extends Document {
  price: number;
  name: string;
  dial_code: string;
  code: string;
}

const shippingPriceSchema = new mongoose.Schema<IShippingPrice>({
  price: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
  },
  dial_code: {
    type: String,
  },
  code: {
    type: String,
  },
});

const ShippingPrice =
  mongoose.models?.ShippingPrice ||
  mongoose.model<IShippingPrice>("ShippingPrice", shippingPriceSchema);

export default ShippingPrice;
