import mongoose, { Document } from "mongoose";
import { IProduct } from "../products/product.model";

export interface ICart extends Document {
  productId: IProduct["_id"];
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

const cartSchema = new mongoose.Schema<ICart>(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "productId is required"],
    },
    quantity: {
      type: Number,
      required: [true, "quantity is required"],
    },
    price: {
      type: Number,
      required: [true, "price is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.models?.Cart || mongoose.model<ICart>("Cart", cartSchema);

export default Cart;
