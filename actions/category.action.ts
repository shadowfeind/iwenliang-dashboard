"use server";

import { CATEGORY_ROUTE } from "@/config/constant/routes";
import connectDB from "@/config/db/connect";
import { categorySchema, CategoryType } from "@/config/schemas/category.schema";
import { auth } from "@/lib/auth";
import { slugify } from "@/lib/slugify";
import Category from "@/models/category.model";
import { revalidatePath } from "next/cache";

export async function createCategory(
  value: CategoryType
): Promise<void | { error: string }> {
  await connectDB();

  const { session } = await auth();

  if (!session) return { error: "Unauthorized" };

  const validateFields = categorySchema.safeParse(value);
  if (!validateFields.success) return { error: "Validation Error" };

  const { name, image } = validateFields.data;

  const slug = slugify(name);

  try {
    await Category.create({
      name,
      slug,
      image,
    });

    revalidatePath(CATEGORY_ROUTE);
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
}

export async function updateCategory(
  value: CategoryType,
  id: string
): Promise<void | { error: string }> {
  await connectDB();

  const { session } = await auth();

  if (!session) return { error: "Unauthorized" };

  const validateFields = categorySchema.safeParse(value);
  if (!validateFields.success) return { error: "Validation Error" };

  const { name, image } = validateFields.data;

  const category = await Category.findById(id);

  if (!category) return { error: "Category not found" };

  if (category && category.name === name)
    return { error: "No change detected" };

  const slug = slugify(name);

  category.name = name;
  category.slug = slug;
  category.image = image;

  try {
    await category.save();
  } catch (error) {
    console.log(error);
    return { error: "Databse error" };
  }

  revalidatePath(CATEGORY_ROUTE);
}

export async function deleteCategory(
  id: string
): Promise<void | { error: string }> {
  await connectDB();

  const { session } = await auth();

  if (!session) return { error: "Unauthorized" };

  try {
    await Category.findByIdAndDelete(id);
    revalidatePath(CATEGORY_ROUTE);
  } catch (error) {
    return { error: "Something went wrong" };
  }
}
