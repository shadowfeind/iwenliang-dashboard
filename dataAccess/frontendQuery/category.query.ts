import { CategoryType } from "@/config/types/category-types";
import { REST_URL } from "../../config/db/constant";

export async function getAllCategories(): Promise<
  CategoryType[] | { error: string }
> {
  const category = await fetch(`${REST_URL}category`);
  if (category) {
    return JSON.parse(JSON.stringify(category));
  } else {
    return { error: "Something went wrong" };
  }
}
