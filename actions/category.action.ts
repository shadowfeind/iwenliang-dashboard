"use server";

import connectDB from "@/config/db/connect";
import { categorySchema, CategoryType } from "@/config/schemas/category.schema";
import { auth } from "@/lib/auth";
import { slugify } from "@/lib/slugify";
import Category from "@/models/category.model";

export async function createCategory(
  value: CategoryType
): Promise<{ success: boolean; error: string }> {
  await connectDB();

  const { session } = await auth();

  if (!session) return { success: false, error: "Unauthorized" };

  const validateFields = categorySchema.safeParse(value);
  if (!validateFields.success)
    return { success: false, error: "Validation Error" };

  const { name } = validateFields.data;

  const slug = slugify(name);

  try {
    await Category.create({
      name,
      slug,
    });

    // will revalidate path

    return {
      success: true,
      error: "",
    };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Something went wrong" };
  }
}

export async function updateCategory(
  value: CategoryType,
  id: string
): Promise<{ success: boolean; error: string }> {
  await connectDB();

  const { session } = await auth();

  if (!session) return { success: false, error: "Unauthorized" };

  const validateFields = categorySchema.safeParse(value);
  if (!validateFields.success)
    return { success: false, error: "Validation Error" };

  const { name } = validateFields.data;

  const category = await Category.findById(id);

  if (!category) return { success: false, error: "Category not found" };

  if (category && category.name === name)
    return { success: false, error: "No change detected" };

  const slug = slugify(name);

  category.name = name;
  category.slug = slug;
  await category.save();

  // will revalidate path

  return {
    success: true,
    error: "",
  };
}

export async function deleteCategory(
  id: string
): Promise<void | { error: string }> {
  await connectDB();

  const { session } = await auth();

  if (!session) return { error: "Unauthorized" };

  try {
    await Category.findByIdAndDelete(id);
    // will revalidate path
  } catch (error) {
    return { error: "Something went wrong" };
  }
}
