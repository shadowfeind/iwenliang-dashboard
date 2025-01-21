"use server";

import { auth } from "@/auth";
import { blogSchema, CreateBlogType } from "./blog.schema";
import { allowedRoles } from "@/config/constant/allowedRoles";
import connectDB from "@/config/db/connect";
import { slugify } from "@/lib/slugify";
import Blog from "./blog.model";
import { revalidateTag } from "next/cache";
import { BLOG_TAG } from "@/config/constant/tags";

export async function createBlog(
  data: CreateBlogType
): Promise<void | { error: string }> {
  try {
    const session = await auth();
    if (!session || !allowedRoles.includes(session?.user.role))
      return { error: "Unauthorized" };

    const validateFields = blogSchema.safeParse(data);
    if (!validateFields.success) return { error: "Validation Error" };

    const { title, content, image, metaTitle, metaDescription } =
      validateFields.data;
    const slug = slugify(title);

    await connectDB();

    await Blog.create({
      title,
      slug,
      content,
      image,
      metaTitle,
      metaDescription,
    });
    revalidateTag(BLOG_TAG);
  } catch (error) {
    console.log("Error from createBlog", error);
    return { error: "Something went wrong" };
  }
}

export async function updateBlog(
  data: CreateBlogType,
  id: string
): Promise<void | { error: string }> {
  try {
    const session = await auth();
    if (!session || !allowedRoles.includes(session?.user.role))
      return { error: "Unauthorized" };

    const validateFields = blogSchema.safeParse(data);
    if (!validateFields.success) return { error: "Validation Error" };

    const { title, content, image, metaTitle, metaDescription } =
      validateFields.data;
    const slug = slugify(title);

    await connectDB();
    await Blog.updateOne(
      { _id: id },
      { $set: { title, content, image, metaTitle, metaDescription, slug } }
    );
    revalidateTag(BLOG_TAG);
  } catch (error) {
    console.log("Error from updateBlog", error);
    return { error: "Something went wrong" };
  }
}

export async function deleteBlog(
  id: string
): Promise<void | { error: string }> {
  try {
    await connectDB();
    await Blog.findByIdAndDelete(id);
    revalidateTag(BLOG_TAG);
  } catch (error) {
    console.log("Error from deleteBlog", error);
    return { error: "Something went wrong" };
  }
}
