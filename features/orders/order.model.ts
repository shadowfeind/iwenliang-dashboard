import mongoose from "mongoose";
import { IProduct } from "../products/product.model";
import { IUser } from "../users/user.model";

export interface IOrderItem {
  name: string;
  quantity: number;
  price: number;
  image: string;
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

export interface Coupon {
  code: string;
  discountType: string;
  discountValue: number;
}

export interface GlobalDiscount {
  name: string;
  discountType: string;
  discountValue: number;
}

export interface IOrder extends Document {
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentMethod: string;
  paymentId?: string;
  itemsPrice: number;
  coupon?: Coupon;
  globalDiscount?: GlobalDiscount;
  shippingPrice?: number;
  taxPrice?: number;
  totalPrice: number;
  user: IUser["_id"];
  status: OrderStatus;
  paidAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new mongoose.Schema<IOrder>(
  {
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
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
    paymentId: { type: String },
    itemsPrice: { type: Number, required: true },
    coupon: {
      code: { type: String },
      discountType: { type: String },
      discountValue: { type: Number },
    },
    globalDiscount: {
      name: { type: String },
      discountType: { type: String },
      discountValue: { type: Number },
    },
    shippingPrice: { type: Number },
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
