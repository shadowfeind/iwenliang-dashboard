"use server";

import connectDB from "@/config/db/connect";
import { productSchema, ProductType } from "@/config/schemas/product.schema";
import { auth } from "@/lib/auth";
import { slugify } from "@/lib/slugify";
import Product from "@/models/product.model";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(
  values: ProductType
): Promise<void | { error: string }> {
  await connectDB();
  const { session } = await auth();

  if (!session) return { error: "Unauthorized" };

  const validateFields = productSchema.safeParse(values);

  if (!validateFields.success) return { error: "Validation error" };

  const { name, images, description, price, salePrice, stock, category } =
    validateFields.data;

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
    });
    revalidatePath("/dashboard/product");
    redirect("/dashboard/product");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
}

export async function updateProduct(
  values: ProductType,
  id: string
): Promise<void | { error: string }> {
  await connectDB();
  const { session } = await auth();

  if (!session) return { error: "Unauthorized" };

  const product = await Product.findById(id).exec();

  if (!product) return { error: "Product not found" };

  const validateFields = productSchema.safeParse(values);

  if (!validateFields.success) return { error: "Validation error" };

  const { name, images, description, price, salePrice, stock, category } =
    validateFields.data;

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
    product.category = category;

    await product.save();

    revalidatePath("/dashboard/product");
    redirect("/dashboard/product");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
}

export async function deleteProduct(
  id: string
): Promise<void | { error: string }> {
  await connectDB();

  const { session } = await auth();

  if (!session) return { error: "Unauthorized" };

  try {
    await Product.findByIdAndDelete(id);
    revalidatePath("/dashboard/product");
  } catch (error) {
    return { error: "Something went wrong" };
  }
}
