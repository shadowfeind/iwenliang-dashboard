import { ColorType } from "@/features/colors/color.types";

export async function getAllColors(): Promise<ColorType[] | { error: string }> {
  try {
    const response = await fetch(`${process.env.REST_URL}color`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      return { error: response.statusText };
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getAllColors query:", error);
    return { error: "Failed to fetch color" };
  }
}

export async function getColorById(
  id: string
): Promise<ColorType | { error: string }> {
  try {
    const response = await fetch(`${process.env.REST_URL}color/${id}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      return { error: response.statusText };
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getColorById query:", error);
    return { error: "Failed to fetch color" };
  }
}
