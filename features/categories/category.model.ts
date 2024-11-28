import mongoose, { Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new mongoose.Schema<ICategory>(
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
    image: String,
  },
  {
    timestamps: true,
  }
);

const Category =
  mongoose.models?.Category ||
  mongoose.model<ICategory>("Category", categorySchema);

export default Category;
