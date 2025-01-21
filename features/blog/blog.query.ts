import connectDB from "@/config/db/connect";
import { unstable_cache as cache } from "next/cache";
import { BlogTYpe } from "./blog.schema";
import Blog from "./blog.model";
import { BLOG_TAG } from "@/config/constant/tags";

export const getAllBlogs = cache(
  async (): Promise<BlogTYpe[] | { error: string }> => {
    await connectDB();
    try {
      const blog = await Blog.find().sort({ createdAt: -1 }).lean<BlogTYpe[]>();
      return JSON.parse(JSON.stringify(blog));
    } catch (error) {
      console.log("Error from getAllBlogs", error);
      return { error: "Something went wrong" };
    }
  },
  [BLOG_TAG],
  {
    tags: [BLOG_TAG],
  }
);

export const getBlogBySlug = async (
  slug: string
): Promise<BlogTYpe | { error: string }> => {
  await connectDB();
  try {
    const blog = await Blog.findOne({ slug }).lean<BlogTYpe>();
    return JSON.parse(JSON.stringify(blog));
  } catch (error) {
    console.log("Error from getBlogBySlug", error);
    return { error: "Something went wrong" };
  }
};
