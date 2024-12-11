import connectDB from "@/config/db/connect";
import { ProductType } from "./product.types";
import Product from "./product.model";
import { cache } from "react";

//testing api will remove in future
export async function getAllProducts(): Promise<
  ProductType[] | { error: any }
> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_REST_URL}product`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    return { error: response.statusText };
  }
  const { data } = await response.json();
  return data;
}

//testing api will remove in future
export async function getProductBySlug(
  slug: string
): Promise<ProductType | { error: any }> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_REST_URL}product/${slug}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) {
    return { error: response.statusText };
  }

  const { data } = await response.json();
  return data;
}

type ProductForFrontPageType = {
  featured: ProductType[];
  products: ProductType[];
};

export const getProductsForFrontPage = cache(
  async (): Promise<ProductForFrontPageType | { error: string }> => {
    await connectDB();

    const products = await Product.find()
      .sort({ createdAt: -1 })
      .lean<ProductType[]>();
    if (!products) return { error: "No products found" };
    const featured = products.filter((product) => product.featured);

    const response = JSON.parse(
      JSON.stringify({ featured, products: products?.slice(0, 8) })
    );
    return response;
  }
);

export const getAllProductsQuery = cache(
  async (): Promise<ProductType[] | { error: string }> => {
    await connectDB();

    const products = await Product.find()
      .sort({ createdAt: -1 })
      .lean<ProductType[]>();

    if (!products) return { error: "No products found" };

    return JSON.parse(JSON.stringify(products));
  }
);

export const getProductBySlugQuery = cache(
  async (slug: string): Promise<ProductType | { error: string }> => {
    await connectDB();

    const product = await Product.findOne({ slug }).lean<ProductType>();

    if (!product) return { error: "Product not found" };

    return JSON.parse(JSON.stringify(product));
  }
);
