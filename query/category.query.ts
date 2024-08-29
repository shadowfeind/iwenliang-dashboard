import { REST_URL } from "@/config/db/constant";
import { CategoryType } from "@/config/types/category-types";

export async function getAllCategories(): Promise<
  CategoryType[] | { error: any }
> {
  const category = await fetch(`${REST_URL}category`, {
    method: "GET",
    credentials: "include",
  });
  return JSON.parse(JSON.stringify(category));
}

export async function getCategoryById(
  id: string
): Promise<CategoryType | { error: string }> {
  const category = await fetch(`${REST_URL}category/${id}`, {
    method: "GET",
    credentials: "include",
  });
  if (category) {
    return JSON.parse(JSON.stringify(category));
  } else {
    return { error: "Something went wrong" };
  }
}
