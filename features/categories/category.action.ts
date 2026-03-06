"use server";

import connectDB from "@/config/db/connect";
import {
  categorySchema,
  CategorySchemaType,
} from "@/features/categories/category.schema";
import { slugify } from "@/lib/slugify";
import Category from "@/features/categories/category.model";
import { revalidateTag } from "next/cache";
import { CATEGORY_TAG, PRODUCT_FILTER } from "@/config/constant/tags";
import { authActionClient } from "@/lib/safe-action";
import { z } from "zod";

export const createCategory = authActionClient
  .schema(categorySchema)
  .action(async ({ parsedInput }) => {
    await connectDB();

    const { name, image } = parsedInput;

    const slug = slugify(name);

    await Category.create({
      name,
      slug,
      image,
    });

    revalidateTag(CATEGORY_TAG);
    revalidateTag(PRODUCT_FILTER);
    return { success: true };
  });

export const updateCategory = authActionClient
  .schema(categorySchema.extend({ id: z.string() }))
  .action(async ({ parsedInput }) => {
    await connectDB();

    const { name, image, id } = parsedInput;

    const category = await Category.findById(id);

    if (!category) return { error: "Category not found" };

    const slug = slugify(name);

    category.name = name;
    category.slug = slug;
    category.image = image;

    await category.save();

    revalidateTag(CATEGORY_TAG);
    revalidateTag(PRODUCT_FILTER);
    return { success: true };
  });

export const deleteCategory = authActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id } }) => {
    await connectDB();
    await Category.findByIdAndDelete(id);
    revalidateTag(CATEGORY_TAG);
    revalidateTag(PRODUCT_FILTER);
    return { success: true };
  });
