"use server";

import connectDB from "@/config/db/connect";
import {
  productSchema,
  ProductSchamaType,
} from "@/features/products/product.schema";
import { slugify } from "@/lib/slugify";
import Product from "./product.model";
import { revalidateTag } from "next/cache";
import { PRODUCT_TAG } from "@/config/constant/tags";
import { authActionClient } from "@/lib/safe-action";
import { z } from "zod";

export const createProduct = authActionClient
  .schema(productSchema)
  .action(async ({ parsedInput }) => {
    await connectDB();

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
    } = parsedInput;

    const productNameExists = await Product.findOne({ name }).lean();

    if (productNameExists) {
      return { error: "Product name already exists" };
    }

    const slug = slugify(name);

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
  });

export const updateProduct = authActionClient
  .schema(productSchema.extend({ id: z.string() }))
  .action(async ({ parsedInput }) => {
    await connectDB();

    const {
      id,
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
    } = parsedInput;

    const product = await Product.findById(id).exec();

    if (!product) return { error: "Product not found" };

    if (name !== product.name) {
      const productNameExists = await Product.findOne({ name }).lean();

      if (productNameExists) return { error: "Product name already exists" };
    }

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
  });

export const deleteProduct = authActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id } }) => {
    await connectDB();
    await Product.findByIdAndDelete(id);
    revalidateTag(PRODUCT_TAG);
    return { success: true };
  });
