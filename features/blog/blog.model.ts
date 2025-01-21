import mongoose, { Document } from "mongoose";

interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  metaTitle: string;
  metaDescription: string;
}

const blogSchema = new mongoose.Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    image: { type: String },
    metaTitle: { type: String, required: true },
    metaDescription: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.models?.Blog || mongoose.model<IBlog>("Blog", blogSchema);
export default Blog;
