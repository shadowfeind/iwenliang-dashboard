import mongoose, { Document } from "mongoose";

interface IShipping extends Document {
  orderId: string;
  dispatchedTo: string;
  dispatchedBy: string;
  trackingNo?: string;
  link?: string;
  dispatchedDate: Date;
  arrivalDate: Date;
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;
}

const shippingSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dispatchedTo: {
      type: String,
      required: true,
    },
    dispatchedBy: {
      type: String,
      required: true,
    },
    trackingNo: {
      type: String,
    },
    link: {
      type: String,
    },
    dispatchedDate: {
      type: Date,
      required: true,
    },
    arrivalDate: {
      type: Date,
      required: true,
    },
    remarks: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Shipping =
  mongoose.models?.Shipping ||
  mongoose.model<IShipping>("Shipping", shippingSchema);
export default Shipping;
