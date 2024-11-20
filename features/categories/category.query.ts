import { REST_URL } from "@/config/db/constant";
import { CategoryType } from "@/features/categories/category.types";

export async function getAllCategories(): Promise<
  CategoryType[] | { error: string }
> {
  const response = await fetch(`${REST_URL}category`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    return { error: response.statusText };
  }
  const { data } = await response.json();
  return data;
}

export async function getCategoryById(
  id: string
): Promise<CategoryType | { error: string }> {
  try {
    const response = await fetch(`${REST_URL}category/${id}`, {
      method: "GET",
      credentials: "include",
    });

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
