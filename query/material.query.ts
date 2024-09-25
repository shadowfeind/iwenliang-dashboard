import { REST_URL } from "@/config/db/constant";
import { MaterialType } from "@/config/types/material.types";

export async function getAllMaterials(): Promise<
  MaterialType[] | { error: string }
> {
  try {
    const response = await fetch(`${REST_URL}material`, {
      method: "GET",
      credentials: "include",
    });
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

export async function getMaterialById(
  id: string
): Promise<MaterialType | { error: string }> {
  try {
    const response = await fetch(`${REST_URL}material/${id}`, {
      method: "GET",
      credentials: "include",
    });

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
