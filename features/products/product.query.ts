import connectDB from "@/config/db/connect";
import { ProductType } from "./product.types";
import Product from "./product.model";

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

export async function getProductsForFrontPage(): Promise<
  ProductForFrontPageType | { error: string }
> {
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
