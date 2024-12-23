import mongoose from "mongoose";
import { IProduct } from "../products/product.model";
import { IUser } from "../users/user.model";

export interface IOrderItem {
  name: string;
  qty: number;
  price: number;
  product: IProduct["_id"];
}

export interface IShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
  email: string;
  fullName: string;
  phone?: string;
}

export enum OrderStatus {
  Pending = "Pending",
  Paid = "Paid",
  Shipped = "Shipped",
  Delivered = "Delivered",
  Cancelled = "Cancelled",
}

export interface IOrder extends Document {
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  discountPrice?: number;
  discountCode?: string;
  discountPercentage?: number;
  shippingPrice?: number;
  discountType?: string;
  taxPrice?: number;
  totalPrice: number;
  user: IUser["_id"];
  status: OrderStatus;
  paidAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new mongoose.Schema<IOrder>(
  {
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
      email: { type: String, required: true },
      fullName: { type: String, required: true },
      phone: { type: String },
    },
    paymentMethod: { type: String, required: true },
    itemsPrice: { type: Number, required: true },
    discountPrice: { type: Number },
    discountCode: { type: String },
    discountPercentage: { type: Number },
    shippingPrice: { type: Number },
    discountType: { type: String },
    taxPrice: { type: Number },
    totalPrice: { type: Number, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Pending,
    },
    paidAt: { type: Date },
  },
  { timestamps: true }
);

const Order =
  mongoose.models?.Order || mongoose.model<IOrder>("Order", orderSchema);
export default Order;
