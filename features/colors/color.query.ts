import connectDB from "@/config/db/connect";
import { ColorType } from "@/features/colors/color.types";
import { unstable_cache as cache } from "next/cache";
import Color from "./color.model";
import { COLOR_TAG } from "@/config/constant/tags";

export async function getAllColors(): Promise<ColorType[] | { error: string }> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_REST_URL}color`, {
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

export const getAllColorsQuery = cache(
  async (): Promise<ColorType[] | { error: string }> => {
    try {
      await connectDB();
      const colors = await Color.find().lean<ColorType[]>();
      return JSON.parse(JSON.stringify(colors));
    } catch (error) {
      console.error("Error fetching colors:", error);
      return { error: "Failed to retrieve colors" };
    }
  },
  [COLOR_TAG],
  {
    tags: [COLOR_TAG],
    revalidate: false,
  }
);

export async function getColorById(
  id: string
): Promise<ColorType | { error: string }> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REST_URL}color/${id}`,
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
    console.error("Error in getColorById query:", error);
    return { error: "Failed to fetch color" };
  }
}
