import { MaterialType } from "@/features/materials/material.types";
import Material from "./material.model";
import { MATERIAL_TAG } from "@/config/constant/tags";
import connectDB from "@/config/db/connect";
import { unstable_cache as cache } from "next/cache";

// for client side only
export async function getAllMaterials(): Promise<
  MaterialType[] | { error: string }
> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REST_URL}material`,
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
    console.error("Error in getAllMaterials query:", error);
    return { error: "Failed to fetch material" };
  }
}

export const getAllMaterialsQuery = cache(
  async (): Promise<MaterialType[] | { error: string }> => {
    try {
      await connectDB();
      const materials = await Material.find().lean<MaterialType[]>();
      return JSON.parse(JSON.stringify(materials));
    } catch (error) {
      console.error("Error fetching materials:", error);
      return { error: "Failed to retrieve materials" };
    }
  },
  [MATERIAL_TAG],
  {
    tags: [MATERIAL_TAG],
    revalidate: false,
  }
);

export async function getMaterialById(
  id: string
): Promise<MaterialType | { error: string }> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REST_URL}material/${id}`,
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
    console.error("Error in getMaterialById query:", error);
    return { error: "Failed to fetch material" };
  }
}
