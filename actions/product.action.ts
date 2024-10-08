"use server";

import connectDB from "@/config/db/connect";
import {
  productSchema,
  ProductSchamaType,
} from "@/config/schemas/product.schema";
import { auth } from "@/lib/auth";
import { slugify } from "@/lib/slugify";
import Product from "@/models/product.model";
import { revalidatePath } from "next/cache";
import { PRODUCT_ROUTE } from "@/config/constant/routes";

export async function createProduct(
  values: ProductSchamaType
): Promise<{ success: boolean } | { error: string }> {
  await connectDB();
  const { session, user } = await auth();

  if (!session || user?.role !== "Admin") return { error: "Unauthorized" };

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
    featured,
    isActive,
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
      featured,
      isActive,
    });
    revalidatePath(PRODUCT_ROUTE);
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
  const { session } = await auth();

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
    featured,
    isActive,
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
    product.featured = featured;
    product.isActive = isActive;

    await product.save();

    revalidatePath(PRODUCT_ROUTE);
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

  const { session, user } = await auth();

  if (!session || user?.role !== "Admin") return { error: "Unauthorized" };

  try {
    await Product.findByIdAndDelete(id);
    revalidatePath(PRODUCT_ROUTE);
  } catch (error) {
    return { error: "Something went wrong" };
  }
}
