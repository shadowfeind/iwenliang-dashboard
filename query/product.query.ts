import { REST_URL } from "@/config/db/constant";
import { ProductType } from "@/config/types/product-types";

export async function getAllProducts(): Promise<
  ProductType[] | { error: any }
> {
  const response = await fetch(`${REST_URL}product`, {
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
  const response = await fetch(`${REST_URL}product/${slug}`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    return { error: response.statusText };
  }

  const { data } = await response.json();
  return data;
}
