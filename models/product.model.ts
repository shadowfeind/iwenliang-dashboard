import mongoose, { Document } from "mongoose";
import { ICategory } from "./category.model";

interface IProduct extends Document {
  name: string;
  slug: string;
  images: string[];
  description: string;
  price: number;
  salePrice: number;
  stock: number;
  category: ICategory["_id"][];
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
    },
    images: [{ type: String }],
    description: String,
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    salePrice: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);
export default Product;
