import { CATEGORY_TAG } from "@/config/constant/tags";
import connectDB from "@/config/db/connect";
import { CategoryType } from "@/features/categories/category.types";
import { unstable_cache as cache } from "next/cache";
import Category from "./category.model";

//will be used for client side only
export async function getAllCategories(): Promise<
  CategoryType[] | { error: string }
> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_REST_URL}category`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    return { error: response.statusText };
  }
  const { data } = await response.json();
  return data;
}

export const getAllCategoriesQuery = cache(async (): Promise<
  CategoryType[] | { error: string }
> => {
  try {
    await connectDB();
    const categories = await Category.find().lean<CategoryType[]>();
    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { error: "Failed to retrieve categories" };
  }
}, [CATEGORY_TAG]);

export async function getCategoryById(
  id: string
): Promise<CategoryType | { error: string }> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REST_URL}category/${id}`,
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
  } catch (error) {
    console.error("Error fetching category:", error);
    return { error: "Failed to fetch category" };
  }
}
