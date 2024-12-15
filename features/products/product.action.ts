"use server";

import connectDB from "@/config/db/connect";
import {
  productSchema,
  ProductSchamaType,
} from "@/features/products/product.schema";
import { slugify } from "@/lib/slugify";
import Product from "./product.model";
import { revalidateTag } from "next/cache";
import { auth } from "@/auth";
import { PRODUCT_TAG } from "@/config/constant/tags";

export async function createProduct(
  values: ProductSchamaType
): Promise<{ success: boolean } | { error: string }> {
  await connectDB();
  const session = await auth();

  if (!session) return { error: "Unauthorized" };

  const validateFields = productSchema.safeParse(values);

  if (!validateFields.success) return { error: "Validation error" };

  const {
    name,
    images,
    description,
    price,
    salePrice,
    stock,
    category,
    color,
    material,
    beadSize,
    featured,
    isActive,
    styleId,
    videoUrl,
  } = validateFields.data;

  const productNameExists = await Product.findOne({ name }).lean();

  if (productNameExists) return { error: "Product name already exists" };

  const slug = slugify(name);

  try {
    await Product.create({
      name,
      slug,
      images,
      description,
      price,
      salePrice,
      stock,
      category,
      color,
      material,
      beadSize,
      featured,
      isActive,
      styleId,
      videoUrl,
    });
    revalidateTag(PRODUCT_TAG);
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
}

export async function updateProduct(
  values: ProductSchamaType,
  id: string
): Promise<{ success: boolean } | { error: string }> {
  await connectDB();
  const session = await auth();

  if (!session) return { error: "Unauthorized" };

  const product = await Product.findById(id).exec();

  if (!product) return { error: "Product not found" };

  const validateFields = productSchema.safeParse(values);

  if (!validateFields.success) return { error: "Validation error" };

  const {
    name,
    images,
    description,
    price,
    salePrice,
    stock,
    category,
    color,
    material,
    beadSize,
    featured,
    isActive,
    styleId,
    videoUrl,
  } = validateFields.data;

  // checking if the name has been changed
  if (name !== product.name) {
    const productNameExists = await Product.findOne({ name }).lean();

    if (productNameExists) return { error: "Product name already exists" };
  }

  try {
    product.name = name;
    product.slug = slugify(name);
    product.images = images;
    product.description = description;
    product.price = price;
    product.salePrice = salePrice;
    product.stock = stock;
    product.color = color;
    product.material = material;
    product.category = category;
    product.beadSize = beadSize;
    product.featured = featured;
    product.isActive = isActive;
    product.styleId = styleId;
    product.videoUrl = videoUrl;

    await product.save();

    revalidateTag(PRODUCT_TAG);
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
}

export async function deleteProduct(
  id: string
): Promise<void | { error: string }> {
  await connectDB();

  const session = await auth();

  if (!session || session.user?.role !== "Admin")
    return { error: "Unauthorized" };

  try {
    await Product.findByIdAndDelete(id);
    revalidateTag(PRODUCT_TAG);
  } catch (error) {
    return { error: "Something went wrong" };
  }
}
